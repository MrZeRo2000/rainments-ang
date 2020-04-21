import { PaymentRepository } from './payment-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {PaymentPersistRepository} from './payment-persist-repository';

describe('PaymentRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, PaymentPersistRepository],
    imports: [HttpClientTestingModule]
  }));


  it('should create an instance', () => {
    expect(new PaymentRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(PaymentPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
