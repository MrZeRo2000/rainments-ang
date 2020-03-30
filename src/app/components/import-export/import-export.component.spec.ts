import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportComponent } from './import-export.component';
import {ImportPaymentObjectExcelComponent} from '../import-payment-object-excel/import-payment-object-excel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {CoreModule} from '../../core/core.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {ImportPaymentObjectRepository} from '../../repository/import-payment-object-repository';
import {BackupDatabaseComponent} from '../backup-database/backup-database.component';
import {RepositoryModule} from '../../repository/repository.module';
import {MessagesModule} from '../../messages/messages.module';

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportComponent, ImportPaymentObjectExcelComponent, BackupDatabaseComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, MessagesModule],
      providers: [RestUrlEnv, RestDataSource, BsModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
