import { ImportPaymentObjectPersistRepository } from './import-payment-object-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('ImportPaymentObjectPersistRepository', () => {
  it('should create an instance', () => {
    expect(new ImportPaymentObjectPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
