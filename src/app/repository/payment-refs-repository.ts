import {ReadRepository} from '../core/read-repository';
import {PaymentRefs} from '../model/payment-refs';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Inject, Injectable} from '@angular/core';
import {Payment} from '../model/payment';

@Injectable()
export class PaymentRefsRepository extends ReadRepository<PaymentRefs> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments/refs');
  }

  protected afterLoadData(data: PaymentRefs[]) {
    super.afterLoadData(data);
    const workData = data[0];
    workData.prevProductPayments = new Map<number, Payment>();
    if (workData) {
      const prevPeriodPayments = workData.prevPeriodPaymentList;
      if (prevPeriodPayments) {
        workData.paymentList.forEach(payment => {
          payment.prevPeriodPayment = prevPeriodPayments.filter(value => value.product.id === payment.product.id)[0];
        });
        prevPeriodPayments.forEach(prevPeriodPayment =>
          workData.prevProductPayments.set(prevPeriodPayment.product.id, prevPeriodPayment));
      }
    }
  }
}
