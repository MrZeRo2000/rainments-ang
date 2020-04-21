import { PaymentGroupPersistRepository } from './payment-group-persist-repository';
import {MessagesService} from '../messages/messages.service';
import {TestBed} from '@angular/core/testing';

describe('PaymentGroupPersistRepository', () => {
  it('should create an instance', () => {
    expect(new PaymentGroupPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
