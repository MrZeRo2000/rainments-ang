import {MessagesService} from '../messages/messages.service';
import {PersistRepository} from '../core/repository/persist-repository';
import {Injectable} from '@angular/core';

@Injectable()
export class ImportPaymentObjectPersistRepository extends PersistRepository{
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
