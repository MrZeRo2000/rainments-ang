import { BackupDatabasePersistRepository } from './backup-database-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('BackupDatabasePersistRepository', () => {
  it('should create an instance', () => {
    expect(new BackupDatabasePersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
