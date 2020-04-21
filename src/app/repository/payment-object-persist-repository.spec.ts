import { PaymentObjectPersistRepository } from './payment-object-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('PaymentObjectPersistRepository', () => {
  it('should create an instance', () => {
    expect(new PaymentObjectPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
