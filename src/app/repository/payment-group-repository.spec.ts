import { PaymentGroupRepository } from './payment-group-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {PaymentGroupPersistRepository} from './payment-group-persist-repository';

describe('PaymentGroupRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, PaymentGroupPersistRepository],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new PaymentGroupRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(PaymentGroupPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
