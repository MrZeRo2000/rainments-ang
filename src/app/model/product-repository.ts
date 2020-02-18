import {ReadWriteRepository} from '../core/read-write-repository';
import {Product} from './product';
import {MessagesService} from '../messages/messages.service';
import {RestDataSource} from '../data-source/rest-data-source';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductRepository extends ReadWriteRepository<Product> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'products');
  }
}
