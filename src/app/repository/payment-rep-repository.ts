import {ReadRepository} from '../core/repository/read-repository';
import {PaymentRep} from '../model/payment-rep';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentRepRepository extends ReadRepository<PaymentRep>{

  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments:payments_by_payment_object_and_payment_period_date_range');
  }

  protected afterLoadData(data: PaymentRep[]) {
    super.afterLoadData(data);
    data[0].paymentRepList.forEach(value => {
      value.periodDate = new Date(value.periodDate);
    })
  }
}
