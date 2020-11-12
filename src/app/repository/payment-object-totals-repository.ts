import {ReadRepository} from '../core/repository/read-repository';
import {PaymentObjectTotals} from '../model/payment-object-totals';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {TimePeriod, TimePeriodType, TimePeriodUtils} from '../core/utils/time-period';

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

      // for month period
      const period = TimePeriodType[value.paymentObject.period] || null;
      const termPeriod = TimePeriod.fromString(value.paymentObject.term);

      if (value.totalAmount === 0 && period && termPeriod) {
        const currentDate = new Date();
        const currentDateTruncated = TimePeriodUtils.truncateToPeriod(currentDate, period);
        const dueDate = TimePeriodUtils.addPeriod(currentDateTruncated, termPeriod);

        value.missedPayment = currentDate > dueDate;
      }
    });
  }
}
