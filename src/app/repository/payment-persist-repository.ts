import {PersistRepository} from '../core/repository/persist-repository';
import {Injectable} from '@angular/core';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentPersistRepository extends PersistRepository {
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
