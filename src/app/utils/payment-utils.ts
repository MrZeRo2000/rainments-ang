import {Payment} from '../model/payment';
import {PaymentAmountSummary} from '../model/payment-amount-summary';

export class PaymentUtils {

  static calcPaymentAmountSummary(payments: Array<Payment>): PaymentAmountSummary {
    return payments.reduce(
      (a, v) => a.addAmounts(v.paymentAmount, v.commissionAmount), new PaymentAmountSummary(0, 0)
    );
  }

  static groupBy(payments: Array<Payment>, groupFields: Array<string>): Array<Payment> {
    const groupedItems = payments.reduce(
      (ap, vp) => {
        const groupObject = Object.keys(vp)
          .filter(v => groupFields.includes(v))
          .reduce((a, v) => {a[v] = vp[v]; return a;},
            {});

        const groupKey = JSON.stringify(groupObject);
        if (ap[groupKey]) {
          ap[groupKey] = [vp.paymentAmount + ap[groupKey][0], vp.commissionAmount + ap[groupKey][1]];
        } else {
          ap[groupKey] = [vp.paymentAmount, vp.commissionAmount];
        }

        return ap;
      },
      {}
    );

    return Object.keys(groupedItems).reduce((a, v) => {
      const payment: Payment = JSON.parse(v);
      payment.date = new Date(payment.date);
      payment.periodDate = new Date(payment.periodDate);
      payment.paymentAmount = groupedItems[v][0];
      payment.commissionAmount = groupedItems[v][1];
      a.push(payment);
      return a;
    },[]);
  }
}
