import { RestDataSource } from './rest-data-source';
import {TestBed} from '@angular/core/testing';
import {RestUrlEnv} from '../config/configuration';
import {environment} from '../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RestDataSource', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv],
    imports: [HttpClientTestingModule]
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
