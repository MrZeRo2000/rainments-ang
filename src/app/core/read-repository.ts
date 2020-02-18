import {Loadable} from './edit-intf';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {HttpParams} from '@angular/common/http';
import {ErrorMessage} from '../messages/message.model';

export class ReadRepository<T> implements Loadable {
  protected data: T[] = new Array<T>();
  protected loading = false;
  protected loadingError = false;

  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService,
    protected resourceName: string) { }

  getLoading(): boolean {
    return this.loading;
  }

  getDataAvailable(): boolean {
    return !this.loadingError && !this.getLoading();
  }

  loadData(params?: HttpParams): void {
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
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + error.message));
      this.loading = false;
      this.loadingError = true;
    });
  }

}
