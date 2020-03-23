import {ReadRepository} from '../core/repository/read-repository';
import {Payment} from '../model/payment';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {ReadWriteRepository} from '../core/repository/read-write-repository';

@Injectable()
export class PaymentRepository extends ReadWriteRepository<Payment> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments');
  }
}
