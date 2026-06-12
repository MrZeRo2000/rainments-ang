import {Loadable} from '../edit/edit-intf';
import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import { HttpParams } from '@angular/common/http';
import {ErrorMessage} from '../../messages/message.model';
import {Subject, tap, map, switchMap, catchError, Observable, iif, of, ReplaySubject, shareReplay} from 'rxjs';
import {RepositoryUtils} from './repository-utils';
import {signal, WritableSignal} from "@angular/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {CommonEntity} from "../entity/common-entity";

export class LoadParams {
  constructor(public params?: HttpParams, public updateMessages?: boolean, public messageSource?: string) { }
}

class MessageProcessor {
  constructor(private messagesService: MessagesService, private loadParams: LoadParams) {
  }

  public resetMessage() {
    if (this.loadParams && this.loadParams.updateMessages) {
      this.messagesService.resetMessage();
    }
  }

  public reportMessageError(message: string) {
    if (this.loadParams && this.loadParams.updateMessages) {
      this.messagesService.reportMessage(new ErrorMessage( message, this.loadParams.messageSource));
    }
  }
}

export abstract class BaseReadRepository<T> implements Loadable {
  protected data: T[] = new Array<T>();
  protected loading = false;
  protected loadingError = false;
  private loadSuccess: Subject<boolean> = new Subject<boolean>();

  private defaultLoadParams: LoadParams = new LoadParams(null, true);

  protected constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService,
    protected resourceName: string) { }

  getLoadSuccessObservable(): Subject<boolean> {
    return this.loadSuccess;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getDataAvailable(): boolean {
    return !this.loadingError && !this.getLoading();
  }

  loadData(params?: HttpParams, loadParams?: LoadParams): void {
    console.log('load data from ' + this.resourceName);

    const workLoadParams = loadParams || this.defaultLoadParams;

    const messageProcessor = new MessageProcessor(this.messagesService, workLoadParams);

    messageProcessor.resetMessage();

    this.loading = true;
    this.dataSource.getResponse<T>(this.resourceName, params).subscribe((data) => {
      if (data.ok) {
        // this.data.length = 0;
        // Object.assign(this.data, data.body);
        if (Array.isArray(data.body)) {
          this.data.splice(0, this.data.length, ...data.body);
        } else {
          this.data.length = 0;
          this.data.push(data.body);
        }

        this.afterLoadData(this.data);

        this.loadingError = false;
        this.loadSuccess.next(true);
      } else {
        this.data.length = 0;

        messageProcessor.reportMessageError('Error reading from server:' + data.body);

        this.loadingError = true;
        this.loadSuccess.next(false);
      }
      this.loading = false;
    }, error => {
      this.data.length = 0;

      messageProcessor.reportMessageError('Network error:' + RepositoryUtils.getNetworkErrorMessage(error));

      this.loading = false;
      this.loadingError = true;
      this.loadSuccess.next(false);
    });
  }

  protected afterLoadData(data: T[]) { }

  getData(): T[] {
    return this.data || [];
  }

  setDefaultLoadParams(defaultLoadParams: LoadParams) {
    if (defaultLoadParams) {
      this.defaultLoadParams = defaultLoadParams;
    }
  }
}

export class ReadRepository<T> {
  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService,
    protected resourceName: string) { }

  private defaultLoadParams: LoadParams = new LoadParams(null, true);

  loadingSignal = signal(false)

  loadDataSubject = new ReplaySubject<LoadParams>(1);

  loadDataAction$: Observable<T[]> = this.loadDataSubject.pipe(
    map(v => ({
        ...v,
        messageProcessor: new MessageProcessor(this.messagesService, v || this.defaultLoadParams)
      }
    )),
    tap(v => {
      v.messageProcessor.resetMessage();
      this.loadingSignal.set(true)
      console.log(`Loading signal set to true: start`)
    }),
    switchMap((v): Observable<T[]> =>
      this.dataSource.getResponse<T>(this.resourceName, v.params).pipe(
        switchMap(data =>
          iif(
            () => data.ok,
            of(Array.isArray(data.body) ? data.body : [data.body]),
            of([]).pipe(
              tap(() => {
                v.messageProcessor.reportMessageError('Error reading from server:' + data.body);
              })
            )
          )
        ),
        catchError(err => {
          v.messageProcessor.reportMessageError('Network error:' + RepositoryUtils.getNetworkErrorMessage(err));
          return []
        })
      )
    ),
    tap(v => {
      this.loadingSignal.set(false)
      console.log(`Loading signal set to false: end`)
    }),
    // Multicast: dataSignal (toSignal) and the template's `repositoryData$ | async`
    // both subscribe. Without sharing, each subscription re-runs the switchMap and
    // fires its own HTTP request, doubling every load.
    shareReplay({ bufferSize: 1, refCount: true })
  )

  dataSignal = toSignal(this.loadDataAction$, { initialValue: [] as T[] });

  loadData(loadParams?: LoadParams): void {
    this.loadDataSubject.next(loadParams);
  }
}
