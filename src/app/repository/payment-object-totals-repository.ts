import {ReadRepository} from '../core/repository/read-repository';
import {PaymentObjectTotals} from '../model/payment-object-totals';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentObjectTotalsRepository extends ReadRepository<PaymentObjectTotals>{
  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService
  ) {
    super(dataSource, messagesService, 'payments:payment_object_totals_by_payment_period');
  }

  protected afterLoadData(data: PaymentObjectTotals[]) {
    super.afterLoadData(data);
    data.forEach(value => {
      value.periodDate = new Date(value.periodDate);
      value.missedPayment = value.totalAmount === 0 && (new Date()).getDate() > 9;
    });
  }
}
