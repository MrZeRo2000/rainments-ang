import { UpdatePaymentObjectGroupPersistRepository } from './update-payment-object-group-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('UpdatePaymentObjectGroupPersistRepository', () => {
  it('should create an instance', () => {
    expect(new UpdatePaymentObjectGroupPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
