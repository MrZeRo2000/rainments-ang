import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../messages/message.model';
import {RepositoryUtils} from '../core/repository/repository-utils';

@Injectable()
export class ImportPaymentObjectRepository {

  private readonly resourceName: string;

  private persistSuccess: Subject<boolean> = new Subject<boolean>();

  private loading = false;

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
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + RepositoryUtils.getNetworkErrorMessage(error)));
      this.loading = false;
      this.persistSuccess.next(false);
    });
  }

  constructor(private dataSource: RestDataSource, private messagesService: MessagesService) {
    this.resourceName = 'payments:import_excel';
  }

  public postFormData(formData: FormData): void {
    this.beforePersist();
    this.handlePersistHttpResponse(this.dataSource.postFormDataResponse(this.resourceName, formData));
  }
}
