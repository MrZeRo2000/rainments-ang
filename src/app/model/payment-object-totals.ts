import {PaymentObject} from './payment-object';

export class PaymentObjectTotals {
  constructor(
    public paymentDate?: Date,
    public paymentObject?: PaymentObject,
    public paymentAmount?: number,
    public paymentOverdue?: boolean
  ) { }
}
