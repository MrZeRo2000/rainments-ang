import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {PaymentGroup} from '../model/payment-group';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentGroupRepository extends ReadWriteRepository<PaymentGroup> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payment-groups');
  }
}
