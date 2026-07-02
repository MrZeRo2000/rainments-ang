import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDatabaseComponent } from './backup-database.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';

describe('BackupDatabaseComponent', () => {
  let component: BackupDatabaseComponent;
  let fixture: ComponentFixture<BackupDatabaseComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BackupDatabaseComponent],
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
