import {PaymentObject} from './payment-object';
import {PaymentGroup} from './payment-group';

export class PaymentObjectGroupRefs {
  constructor(
    public paymentObjectList?: Array<PaymentObject>,
    public paymentGroupList?: Array<PaymentGroup>
  ) {}
}
