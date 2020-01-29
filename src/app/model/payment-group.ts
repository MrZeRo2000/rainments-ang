import {CommonEntity} from '../core/common-entity';

export class PaymentGroup extends CommonEntity {
  constructor(public id?: number, public name?: string, public url?: string) {
    super(id);
  }
}
