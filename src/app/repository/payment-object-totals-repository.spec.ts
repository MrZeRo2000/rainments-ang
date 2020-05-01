import { PaymentObjectTotalsRepository } from './payment-object-totals-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import {PaymentObjectPersistRepository} from './payment-object-persist-repository';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PaymentObjectTotalsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new PaymentObjectTotalsRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(MessagesService)
    )).toBeTruthy();
  });
});
