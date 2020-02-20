import { PaymentRefsRepository } from './payment-refs-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';

describe('PaymentRefsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
  }));


  it('should create an instance', () => {
    expect(new PaymentRefsRepository(TestBed.get(RestDataSource), TestBed.get(MessagesService))).toBeTruthy();
  });
});
