import { UpdatePaymentObjectGroupRepository } from './update-payment-object-group-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UpdatePaymentObjectGroupRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [UpdatePaymentObjectGroupRepository, RestDataSource, RestUrlEnv, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(TestBed.inject(UpdatePaymentObjectGroupRepository)).toBeTruthy();
  });
});
