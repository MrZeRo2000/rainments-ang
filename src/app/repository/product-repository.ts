import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {Product} from '../model/product';
import {MessagesService} from '../messages/messages.service';
import {RestDataSource} from '../data-source/rest-data-source';
import {Injectable} from '@angular/core';
import {AppPersistRepository} from './app-persist-repository';

@Injectable()
export class ProductRepository extends ReadWriteRepository<Product> {
  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: AppPersistRepository,
    protected messagesService: MessagesService) {
    super(dataSource, persistRepository, messagesService, 'products');
  }
}
