import {PersistRepositoryDecorator} from '../core/repository/persist-repository-decorator';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UpdatePaymentObjectGroupPersistRepository} from './update-payment-object-group-persist-repository';

@Injectable()
export class UpdatePaymentObjectGroupRepository extends PersistRepositoryDecorator {
  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: UpdatePaymentObjectGroupPersistRepository,
    protected messagesService: MessagesService) {
    super(dataSource, persistRepository, messagesService, 'payments:update_payment_group');
  }

  public postFormData(httpParams: HttpParams): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', undefined);
    headers.append('Accept', 'application/json');

    this.persistRepository.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, {}, httpParams, headers));
  }

}
