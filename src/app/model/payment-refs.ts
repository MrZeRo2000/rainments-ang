import {Payment} from './payment';
import {PaymentObject} from './payment-object';
import {PaymentGroup} from './payment-group';
import {Product} from './product';

export class PaymentRefs {
  constructor(
    public paymentList?: Array<Payment>,
    public prevPeriodPaymentList?: Array<Payment>,
    public paymentObjectList?: Array<PaymentObject>,
    public paymentGroupList?: Array<PaymentGroup>,
    public productList?: Array<Product>,
    public prevProductPayments?: Map<number, Payment>
  ) {}
}
