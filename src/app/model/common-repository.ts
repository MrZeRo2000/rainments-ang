import {RestDataSource} from './rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {ErrorMessage} from '../messages/message.model';

export class CommonRepository<T> {
  private emptyData: T[] = new Array<T>();
  private data: T[] = new Array<T>();
  private loading = false;
  private loadingError = false;

  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService, private resourceName: string) { }

  loadData(): void {
    this.loading = true;
    this.dataSource.getResponse(this.resourceName).subscribe((data) => {
      if (data.ok) {
        Object.assign(this.data, data.body);
        this.loadingError = false;
      } else {
        Object.assign(this.data, this.emptyData);
        this.messagesService.reportMessage(new ErrorMessage( 'Error reading from server:' + data.body));
        this.loadingError = true;
      }
      this.loading = false;
    }, error => {
      Object.assign(this.data, this.emptyData);
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + error.statusText));
      this.loading = false;
      this.loadingError = true;
    });
  }

  getData(): T[] {
    return this.data;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingError(): boolean {
    return this.loadingError;
  }

  getDataAvailable(): boolean {
    return !this.loadingError && !this.getLoading();
  }
}
