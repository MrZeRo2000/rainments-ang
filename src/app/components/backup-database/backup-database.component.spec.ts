import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDatabaseComponent } from './backup-database.component';
import {RepositoryModule} from '../../repository/repository.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {CoreModule} from '../../core/core.module';
import {MessagesModule} from '../../messages/messages.module';

describe('BackupDatabaseComponent', () => {
  let component: BackupDatabaseComponent;
  let fixture: ComponentFixture<BackupDatabaseComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ BackupDatabaseComponent ],
      imports: [RepositoryModule, CoreModule, MessagesModule],
      providers: [RestUrlEnv, RestDataSource]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
