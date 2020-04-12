import {ReadRepository} from '../core/repository/read-repository';
import {PaymentObjectGroupRefs} from '../model/payment-object-group-refs';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentObjectGroupRefsRepository extends ReadRepository<PaymentObjectGroupRefs> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments:payment_object_group_refs');
  }
}
