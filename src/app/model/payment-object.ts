import {CommonEntity} from './common-entity';

export class PaymentObject extends CommonEntity {
  constructor(public id?: number, public name?: string) {
    super(id);
  }
}
