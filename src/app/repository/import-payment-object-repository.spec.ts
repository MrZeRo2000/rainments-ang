import { ImportPaymentObjectRepository } from './import-payment-object-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ImportPaymentObjectRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new ImportPaymentObjectRepository(TestBed.inject(RestDataSource), TestBed.inject(MessagesService))).toBeTruthy();
  });
});
