import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObject} from './payment-object';
import {Injectable} from '@angular/core';
import {CommonRepository} from '../core/common-repository';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentObjectRepository extends CommonRepository<PaymentObject> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payment-objects');
  }
}
