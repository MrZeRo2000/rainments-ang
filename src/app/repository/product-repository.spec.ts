import { ProductRepository } from './product-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {ProductPersistRepository} from './product-persist-repository';

describe('ProductRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, ProductPersistRepository],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new ProductRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(ProductPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
