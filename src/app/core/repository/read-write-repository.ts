
import {Subject} from 'rxjs';
import {CommonEntity} from '../entity/common-entity';
import {ReadRepository} from './read-repository';
import {PatchRequest} from '../../model/patch-request';
import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import {PersistRepository} from './persist-repository';

export class ReadWriteRepository<T extends CommonEntity> extends ReadRepository<T> {

  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: PersistRepository,
    protected messagesService: MessagesService,
    protected resourceName: string) {
    super(dataSource, messagesService, resourceName);
    this.persistRepository.getLoadingState().subscribe(value => this.loading = value);
  }

  postItem(item: T): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, item));
  }

  putItem(id: number, item: T): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.putResponse(this.resourceName, id, item));
  }

  deleteItem(id: number): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.deleteResponse(this.resourceName, id));
  }

  patchItem(id: number, patchRequest: PatchRequest): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.patchResponse(this.resourceName, id, patchRequest));
  }

  getPersistSuccessObservable(): Subject<boolean> {
    return this.persistRepository.getPersistSuccess();
  }
}
