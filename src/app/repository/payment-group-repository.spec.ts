import { PaymentGroupRepository } from './payment-group-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {PaymentGroupPersistRepository} from './payment-group-persist-repository';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentGroupRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, PaymentGroupPersistRepository, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(new PaymentGroupRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(PaymentGroupPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
