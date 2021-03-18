import {PaymentAmountSummary} from './payment-amount-summary';

export class PaymentSummary extends PaymentAmountSummary {
  constructor(public groupName: string, public paymentAmount: number, public commissionAmount: number) {
    super(paymentAmount, commissionAmount)
  }
}
