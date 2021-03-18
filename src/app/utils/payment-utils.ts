import {Payment} from '../model/payment';
import {PaymentAmountSummary} from '../model/payment-amount-summary';

export class PaymentUtils {

  static calcPaymentAmountSummary(payments: Array<Payment>): PaymentAmountSummary {
    return payments.reduce(
      (a, v) => a.addAmounts(v.paymentAmount, v.commissionAmount), new PaymentAmountSummary(0, 0)
    );
  }
}
