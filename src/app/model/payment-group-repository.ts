import {CommonRepository} from '../core/common-repository';
import {PaymentGroup} from './payment-group';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentGroupRepository extends CommonRepository<PaymentGroup> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payment-groups');
  }
}