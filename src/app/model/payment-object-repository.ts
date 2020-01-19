import {RestDataSource} from './rest-data-source';
import {PaymentObject} from './payment-object';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
import {CommonRepository} from './common-repository';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentObjectRepository extends CommonRepository<PaymentObject> {

  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'paymentobjects');
  }

}
