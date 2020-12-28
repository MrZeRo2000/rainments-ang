import {PaymentObject} from './payment-object';
import {Payment} from './payment';

export class PaymentRep {
  constructor(
    public paymentObject: PaymentObject,
    public paymentRepList: Payment[]
  ) { }
}
