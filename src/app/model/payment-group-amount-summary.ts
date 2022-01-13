import {PaymentAmountSummary} from './payment-amount-summary';
import {PaymentGroup} from './payment-group';

export class PaymentGroupAmountSummary extends PaymentAmountSummary {
  constructor(public paymentGroup: PaymentGroup, public paymentAmount: number, public commissionAmount: number) {
    super(paymentAmount, commissionAmount)
  }
}
