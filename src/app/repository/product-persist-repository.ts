import {PersistRepository} from '../core/repository/persist-repository';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductPersistRepository extends PersistRepository {
  constructor(messagesService: MessagesService) {
    super(messagesService);
  }
}
