import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {Product} from '../model/product';
import {MessagesService} from '../messages/messages.service';
import {RestDataSource} from '../data-source/rest-data-source';
import {Injectable} from '@angular/core';
import {ProductPersistRepository} from './product-persist-repository';

@Injectable()
export class ProductRepository extends ReadWriteRepository<Product> {
  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: ProductPersistRepository,
    protected messagesService: MessagesService) {
    super(dataSource, persistRepository, messagesService, 'products');
  }
}
