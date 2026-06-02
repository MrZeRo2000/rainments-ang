import {MessagesService} from '../messages/messages.service';
import {BasePersistRepository} from '../core/repository/persist-repository';
import {Injectable} from '@angular/core';

@Injectable()
export class ImportPaymentObjectPersistRepository extends BasePersistRepository{
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
