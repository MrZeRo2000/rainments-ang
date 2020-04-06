import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../messages/message.model';
import {RepositoryUtils} from './repository-utils';
import {MessagesService} from '../../messages/messages.service';

export class PersistParams {
  public messageSource?: string;
}

export abstract class PersistRepository {
  private persistSuccess: Subject<boolean> = new Subject<boolean>();
  private persistData: Subject<any> = new Subject<any>();

  private loadingState: Subject<boolean> = new Subject<boolean>();
  private defaultPersistParams: PersistParams;

  public getPersistSuccess(): Subject<boolean> {
    return this.persistSuccess;
  }

  public getPersistData(): Subject<any> {
    return this.persistData;
  }

  public getLoadingState(): Subject<boolean> {
    return this.loadingState;
  }

  protected constructor(private messagesService: MessagesService) {
  }

  private beforePersist(): void {
    this.messagesService.resetMessage();
    this.loadingState.next(true);
  }

  private reportErrorMessage(message: string): void {
    const workMessageSource = this.defaultPersistParams && this.defaultPersistParams.messageSource;
    this.messagesService.reportMessage(new ErrorMessage( message, workMessageSource));
  }

  private internalHandlePersistHttpResponse( observable: Observable<HttpResponse<any>>): void {
    observable.subscribe((data) => {
      if (data.ok) {
        // Object.assign(this.lastItem, data.body);
        this.loadingState.next(false);
        this.persistSuccess.next(true);
        this.persistData.next(data);
      } else {
        this.reportErrorMessage('Error posting data to server:' + data.body);
        this.persistSuccess.next(false);
      }
    }, error => {
      this.reportErrorMessage('Network error:' + RepositoryUtils.getNetworkErrorMessage(error));
      this.loadingState.next( false);
      this.persistSuccess.next(false);
    });
  }

  public handlePersistHttpResponse( observable: Observable<HttpResponse<any>>): void {
    this.beforePersist();
    this.internalHandlePersistHttpResponse(observable);
  }

  public setDefaultPersistParams(persistParams: PersistParams): void {
    this.defaultPersistParams = persistParams;
  }
}
