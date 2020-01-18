import { PaymentObjectRepository } from './payment-object-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from './rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PaymentObjectRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {

    expect(new PaymentObjectRepository(TestBed.get(RestDataSource))).toBeTruthy();
  });
});
