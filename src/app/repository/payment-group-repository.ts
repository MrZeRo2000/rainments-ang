import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {PaymentGroup} from '../model/payment-group';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';
import {AppPersistRepository} from './app-persist-repository';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class PaymentGroupRepository extends ReadWriteRepository<PaymentGroup> {
  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: AppPersistRepository,
    protected messagesService: MessagesService
  ) {
    super(dataSource, persistRepository, messagesService, 'payment-groups');
  }
}
