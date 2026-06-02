import {BasePersistRepository} from '../core/repository/persist-repository';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentObjectPersistRepository extends BasePersistRepository {
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
