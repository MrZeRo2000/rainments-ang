import { PaymentObjectRepository } from './payment-object-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {PaymentObjectPersistRepository} from './payment-object-persist-repository';

describe('PaymentObjectRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, PaymentObjectPersistRepository],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new PaymentObjectRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(PaymentObjectPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
