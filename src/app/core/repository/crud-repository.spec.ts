import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CrudRepository } from './crud-repository';
import { RestDataSource } from '../../data-source/rest-data-source';
import { MessagesService } from '../../messages/messages.service';
import { RestUrlEnv } from '../../config/configuration';

describe('CrudRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RestDataSource, RestUrlEnv, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
  }));

  it('should create an instance', () => {
    const repo = new CrudRepository(TestBed.inject(RestDataSource), TestBed.inject(MessagesService), 'test');
    expect(repo).toBeTruthy();
  });
});
