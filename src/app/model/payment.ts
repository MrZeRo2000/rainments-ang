import {CommonEntity} from '../core/common-entity';
import {PaymentObject} from './payment-object';
import {PaymentGroup} from './payment-group';
import {Product} from './product';

export class Payment extends CommonEntity {
  constructor(
    public id?: number,
    public date?: Date,
    public periodDate?: Date,
    public paymentObject?: PaymentObject,
    public paymentGroup?: PaymentGroup,
    public product?: Product,
    public productCounter?: number,
    public paymentAmount?: number,
    public commissionAmount?: number) {
    super(id);
  }
}
