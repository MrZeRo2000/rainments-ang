import { PaymentObjectTotalsRepository } from './payment-object-totals-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import {PaymentObjectPersistRepository} from './payment-object-persist-repository';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentObjectTotalsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(new PaymentObjectTotalsRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(MessagesService)
    )).toBeTruthy();
  });
});
