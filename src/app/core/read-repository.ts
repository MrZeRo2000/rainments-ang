import {Loadable} from './edit-intf';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {HttpParams} from '@angular/common/http';
import {ErrorMessage} from '../messages/message.model';
import {Subject} from 'rxjs';
import {RepositoryUtils} from './repository-utils';

export class ReadRepository<T> implements Loadable {
  protected data: T[] = new Array<T>();
  protected loading = false;
  protected loadingError = false;
  private loadSuccess: Subject<boolean> = new Subject<boolean>();

  constructor(
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

  loadData(params?: HttpParams): void {
    console.log('load data from ' + this.resourceName);
    this.messagesService.resetMessage();
    this.loading = true;
    this.dataSource.getResponse(this.resourceName, params).subscribe((data) => {
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
        this.messagesService.reportMessage(new ErrorMessage( 'Error reading from server:' + data.body));
        this.loadingError = true;
        this.loadSuccess.next(false);
      }
      this.loading = false;
    }, error => {
      this.data.length = 0;
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + RepositoryUtils.getNetworkErrorMessage(error)));
      this.loading = false;
      this.loadingError = true;
      this.loadSuccess.next(false);
    });
  }

  protected afterLoadData(data: T[]) { }

  getData(): T[] {
    return this.data || [];
  }

}
