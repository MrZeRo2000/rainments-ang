import { PaymentRepository } from './payment-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';

describe('PaymentRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
  }));


  it('should create an instance', () => {
    expect(new PaymentRepository(TestBed.get(RestDataSource), TestBed.get(MessagesService))).toBeTruthy();
  });
});