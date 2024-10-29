
import {Subject} from 'rxjs';
import {CommonEntity} from '../entity/common-entity';
import {ReadRepository} from './read-repository';
import {PatchRequest} from '../../model/patch-request';
import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import {PersistRepository} from './persist-repository';
import { HttpParams } from '@angular/common/http';

export abstract class ReadWriteRepository<T extends CommonEntity> extends ReadRepository<T> {

  protected constructor(
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

  moveItem(fromId: number, toId: number): void {
    const httpParams = new HttpParams()
      .append('fromId', fromId.toString(10))
      .append('toId', toId.toString(10));

    this.persistRepository.handlePersistHttpResponse(
      this.dataSource.postResponse(
        this.resourceName + '/operation:move_order',
        {},
        httpParams
      )
    );
  }

  setDefaultOrder(): void {
    this.persistRepository.handlePersistHttpResponse(
      this.dataSource.postResponse(
        this.resourceName + '/operation:set_default_order',
        {}
      )
    );
  }

  getPersistSuccessObservable(): Subject<boolean> {
    return this.persistRepository.getPersistSuccess();
  }
}
