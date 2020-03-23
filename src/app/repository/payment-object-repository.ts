import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObject} from '../model/payment-object';
import {Injectable} from '@angular/core';
import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentObjectRepository extends ReadWriteRepository<PaymentObject> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payment-objects');
  }
}
