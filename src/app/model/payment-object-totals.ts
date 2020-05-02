import {PaymentObject} from './payment-object';

export class PaymentObjectTotals {
  constructor(
    public periodDate?: Date,
    public paymentObject?: PaymentObject,
    public totalAmount?: number,
    public missedPayment?: boolean
  ) { }
}
