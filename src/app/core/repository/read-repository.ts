import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import { HttpParams } from '@angular/common/http';
import {ErrorMessage} from '../../messages/message.model';
import {tap, map, switchMap, catchError, Observable, iif, of, ReplaySubject, shareReplay} from 'rxjs';
import {RepositoryUtils} from './repository-utils';
import {signal} from "@angular/core";
import {toSignal} from "@angular/core/rxjs-interop";

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

export type ItemMapper<T> = (raw: any) => T;

/** Mapper that coerces the named fields from ISO date strings to Date. */
export function withDates<T>(...dateKeys: (keyof T)[]): ItemMapper<T> {
  return (raw: any) => {
    const item = {...raw};
    for (const key of dateKeys) {
      if (item[key]) {
        item[key] = new Date(item[key] as string);
      }
    }
    return item as T;
  };
}

export class ReadRepository<T> {
  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService,
    protected resourceName: string,
    // Per-item transform applied to loaded data; identity by default.
    protected mapItem: ItemMapper<T> = (raw) => raw as T) { }

  private defaultLoadParams: LoadParams = new LoadParams(null, true);

  loadingSignal = signal(false)

  /** True when the most recent load failed (network or server error). */
  errorSignal = signal(false)

  loadDataSubject = new ReplaySubject<LoadParams>(1);

  loadDataAction$: Observable<T[]> = this.loadDataSubject.pipe(
    map(v => ({
        ...v,
        messageProcessor: new MessageProcessor(this.messagesService, v || this.defaultLoadParams)
      }
    )),
    tap(v => {
      v.messageProcessor.resetMessage();
      this.errorSignal.set(false)
      this.loadingSignal.set(true)
      console.log(`Loading signal set to true: start`)
    }),
    switchMap((v): Observable<T[]> =>
      this.dataSource.getResponse<T>(this.resourceName, v.params).pipe(
        switchMap(data =>
          iif(
            () => data.ok,
            of((Array.isArray(data.body) ? data.body : [data.body]).map(this.mapItem)),
            of([]).pipe(
              tap(() => {
                this.errorSignal.set(true);
                v.messageProcessor.reportMessageError('Error reading from server:' + data.body);
              })
            )
          )
        ),
        catchError(err => {
          this.errorSignal.set(true);
          v.messageProcessor.reportMessageError('Network error:' + RepositoryUtils.getNetworkErrorMessage(err));
          // Emit an empty result (of([])) — NOT `[]`, which as an ObservableInput
          // emits nothing, so the downstream `loadingSignal.set(false)` tap never
          // runs and loading stays stuck on after an error.
          return of([])
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
