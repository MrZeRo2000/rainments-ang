import {ReadRepository} from '../core/read-repository';
import {PaymentRefs} from '../model/payment-refs';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class PaymentRefsRepository extends ReadRepository<PaymentRefs> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments/refs');
  }
}
