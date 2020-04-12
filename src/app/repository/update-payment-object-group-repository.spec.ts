import { UpdatePaymentObjectGroupRepository } from './update-payment-object-group-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {UpdatePaymentObjectGroupPersistRepository} from './update-payment-object-group-persist-repository';

describe('UpdatePaymentObjectGroupRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, UpdatePaymentObjectGroupPersistRepository],
    imports: [HttpClientTestingModule]
  }));

  it('should create an instance', () => {
    expect(new UpdatePaymentObjectGroupRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(UpdatePaymentObjectGroupPersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
