import { AppInfoRepository } from './app-info-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {RestUrlEnv} from '../config/configuration';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppInfoRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(new AppInfoRepository(TestBed.inject(RestDataSource), TestBed.inject(MessagesService))).toBeTruthy();
  });
});
