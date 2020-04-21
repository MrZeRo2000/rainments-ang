import { PaymentPersistRepository } from './payment-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('PaymentPersistRepository', () => {
  it('should create an instance', () => {
    expect(new PaymentPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
