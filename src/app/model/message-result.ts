import {CommonEntity} from '../core/entity/common-entity';

/**
 * Generic result of a write/operation endpoint that reports a textual message
 * (e.g. a backup confirmation).
 */
export class MessageResult extends CommonEntity {
  constructor(public message?: string) {
    super();
  }
}
