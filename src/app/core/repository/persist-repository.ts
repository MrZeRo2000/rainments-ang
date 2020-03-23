import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ErrorMessage} from '../../messages/message.model';
import {RepositoryUtils} from './repository-utils';
import {MessagesService} from '../../messages/messages.service';

export class PersistRepository {
  private persistSuccess: Subject<boolean> = new Subject<boolean>();

  private loadingState: Subject<boolean> = new Subject<boolean>();

  public getPersistSuccess(): Subject<boolean> {
    return this.persistSuccess;
  }

  public getLoadingState(): Subject<boolean> {
    return this.loadingState;
  }

  constructor(private messagesService: MessagesService) {
  }

  private beforePersist(): void {
    this.messagesService.resetMessage();
    this.loadingState.next(true);
  }

  private internalHandlePersistHttpResponse( observable: Observable<HttpResponse<any>>): void {
    observable.subscribe((data) => {
      if (data.ok) {
        // Object.assign(this.lastItem, data.body);
        this.loadingState.next(false);
        this.persistSuccess.next(true);
      } else {
        this.messagesService.reportMessage(new ErrorMessage( 'Error posting data to server:' + data.body));
        this.persistSuccess.next(false);
      }
    }, error => {
      this.messagesService.reportMessage(new ErrorMessage( 'Network error:' + RepositoryUtils.getNetworkErrorMessage(error)));
      this.loadingState.next( false);
      this.persistSuccess.next(false);
    });
  }

  public handlePersistHttpResponse( observable: Observable<HttpResponse<any>>): void {
    this.beforePersist();
    this.internalHandlePersistHttpResponse(observable);
  }
}
