import {RestDataSource} from './rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {ErrorMessage} from '../messages/message.model';
import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export class CommonRepository<T> {
  private data: T[] = new Array<T>();
  private loading = false;
  private loadingError = false;
  private persistSuccess: Subject<boolean> = new Subject<boolean>();

  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService, private resourceName: string) { }

  loadData(): void {
    this.messagesService.resetMessage();
    this.loading = true;
    this.dataSource.getResponse(this.resourceName).subscribe((data) => {
      if (data.ok) {
        // this.data.length = 0;
        // Object.assign(this.data, data.body);
        this.data.splice(0, this.data.length, ...data.body);
        this.loadingError = false;
      } else {
        this.data.length = 0;
        this.messagesService.reportMessage(new ErrorMessage( 'Error reading from server:' + data.body));
        this.loadingError = true;
      }
      this.loading = false;
    }, error => {
      this.data.length = 0;
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + error.statusText));
      this.loading = false;
      this.loadingError = true;
    });
  }

  private beforePersist(): void {
    this.messagesService.resetMessage();
    this.loading = true;
  }

  private handlePersistHttpResponse( observable: Observable<HttpResponse<any>>): void {
    observable.subscribe((data) => {
      if (data.ok) {
        // Object.assign(this.lastItem, data.body);
        this.loading = false;
        this.persistSuccess.next(true);
      } else {
        this.messagesService.reportMessage(new ErrorMessage( 'Error posting data to server:' + data.body));
        this.persistSuccess.next(false);
      }
    }, error => {
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + error.statusText));
      this.loading = false;
      this.persistSuccess.next(false);
    });
  }

  postItem(item: T): void {
    this.beforePersist();
    this.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, item));
  }

  putItem(id: number, item: T): void {
    this.beforePersist();
    this.handlePersistHttpResponse(this.dataSource.putResponse(this.resourceName, id, item));
  }

  deleteItem(id: number): void {
    this.beforePersist();
    this.handlePersistHttpResponse(this.dataSource.deleteResponse(this.resourceName, id));
  }

  getData(): T[] {
    return this.data;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getDataAvailable(): boolean {
    return !this.loadingError && !this.getLoading();
  }

  getPersistSuccessObservable(): Subject<boolean> {
    return this.persistSuccess;
  }
}
