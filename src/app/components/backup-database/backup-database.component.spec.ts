import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDatabaseComponent } from './backup-database.component';
import {RepositoryModule} from '../../repository/repository.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {CoreModule} from '../../core/core.module';
import {LoadingProgressComponent} from '../../core/components/loading-progress/loading-progress.component';

describe('BackupDatabaseComponent', () => {
  let component: BackupDatabaseComponent;
  let fixture: ComponentFixture<BackupDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupDatabaseComponent ],
      imports: [RepositoryModule, ModalModule.forRoot(), CoreModule],
      providers: [RestUrlEnv, RestDataSource]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
