import { BackupDatabaseRepository } from './backup-database-repository';
import {TestBed} from '@angular/core/testing';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {RestUrlEnv} from '../config/configuration';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {BackupDatabasePersistRepository} from './backup-database-persist-repository';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BackupDatabaseRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [RestDataSource, RestUrlEnv, BackupDatabasePersistRepository, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should create an instance', () => {
    expect(new BackupDatabaseRepository(
      TestBed.inject(RestDataSource),
      TestBed.inject(BackupDatabasePersistRepository),
      TestBed.inject(MessagesService))).toBeTruthy();
  });
});
