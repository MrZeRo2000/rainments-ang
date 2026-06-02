import {BasePersistRepository} from '../core/repository/persist-repository';
import {Injectable} from '@angular/core';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class PaymentPersistRepository extends BasePersistRepository {
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
