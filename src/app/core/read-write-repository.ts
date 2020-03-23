import {ErrorMessage} from '../messages/message.model';
import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {CommonEntity} from './common-entity';
import {ReadRepository} from './read-repository';
import {PatchRequest} from '../model/patch-request';
import {RepositoryUtils} from './repository-utils';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';

export class ReadWriteRepository<T extends CommonEntity> extends ReadRepository<T> {

  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService,
    protected resourceName: string) {
    super(dataSource, messagesService, resourceName);
  }

  private persistSuccess: Subject<boolean> = new Subject<boolean>();

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

  patchItem(id: number, patchRequest: PatchRequest): void {
    this.beforePersist();
    this.handlePersistHttpResponse(this.dataSource.patchResponse(this.resourceName, id, patchRequest));
  }

  getPersistSuccessObservable(): Subject<boolean> {
    return this.persistSuccess;
  }
}
