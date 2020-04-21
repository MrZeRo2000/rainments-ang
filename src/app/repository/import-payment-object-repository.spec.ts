import { ImportPaymentObjectRepository } from './import-payment-object-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ImportPaymentObjectPersistRepository} from './import-payment-object-persist-repository';

describe('ImportPaymentObjectRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, ImportPaymentObjectPersistRepository],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new ImportPaymentObjectRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(ImportPaymentObjectPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
