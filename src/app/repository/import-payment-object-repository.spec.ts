import { ImportPaymentObjectRepository } from './import-payment-object-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ImportPaymentObjectPersistRepository} from './import-payment-object-persist-repository';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ImportPaymentObjectRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, ImportPaymentObjectPersistRepository, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(new ImportPaymentObjectRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(ImportPaymentObjectPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
