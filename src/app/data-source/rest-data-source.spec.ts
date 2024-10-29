import { RestDataSource } from './rest-data-source';
import {TestBed} from '@angular/core/testing';
import {RestUrlEnv} from '../config/configuration';
import {environment} from '../../environments/environment';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RestDataSource', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  let instance: RestDataSource;

  it('should create an instance', () => {
    instance = TestBed.inject(RestDataSource);
    expect(instance).toBeTruthy();
  });

  it('getting correct restUtl', () => {
    instance = TestBed.inject(RestDataSource);
    expect(instance.restUrl).toBe(environment.restUrl);
  });

});
