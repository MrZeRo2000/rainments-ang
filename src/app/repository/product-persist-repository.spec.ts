import { ProductPersistRepository } from './product-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('ProductPersistRepository', () => {
  it('should create an instance', () => {
    expect(new ProductPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
