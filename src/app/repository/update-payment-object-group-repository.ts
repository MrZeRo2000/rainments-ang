import {Injectable, inject} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {CrudRepository} from '../core/repository/crud-repository';
import {RowsAffectedResult} from '../model/rows-affected-result';

@Injectable()
export class UpdatePaymentObjectGroupRepository extends CrudRepository<RowsAffectedResult> {
  constructor() {
    super(inject(RestDataSource), inject(MessagesService), 'payments:update_payment_group');
  }
}
