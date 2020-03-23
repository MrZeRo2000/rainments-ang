import {CommonEntity} from '../core/entity/common-entity';

export class Product extends CommonEntity {
  constructor(public id?: number, public name?: string, public unitName?: string) {
    super(id);
  }
}
