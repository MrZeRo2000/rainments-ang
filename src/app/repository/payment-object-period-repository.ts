import {Injectable} from '@angular/core';
import {ReadRepository} from '../core/repository/read-repository';
import {PaymentObjectTotals} from '../model/payment-object-totals';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentObjectPeriodRepository extends ReadRepository<PaymentObjectTotals> {
  constructor(
    protected dataSource: RestDataSource,
    protected messagesService: MessagesService
  ) {
    super(dataSource, messagesService, 'payments:payment_object_period_by_id');
  }

  protected afterLoadData(data: PaymentObjectTotals[]) {
    super.afterLoadData(data);
    data.forEach(value => {
      if (value.paymentDate) {
        value.paymentDate = new Date(value.paymentDate);
      }
    });
  }

}
