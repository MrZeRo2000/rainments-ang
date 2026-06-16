import {CommonEntity} from '../core/entity/common-entity';

/**
 * Generic result of a write/operation endpoint that reports how many rows it
 * affected (maps to the backend's RowsAffectedDTO).
 */
export class RowsAffectedResult extends CommonEntity {
  constructor(public rowsAffected?: number) {
    super();
  }
}
