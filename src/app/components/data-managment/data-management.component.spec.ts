import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementComponent } from './data-management.component';
import {ImportPaymentObjectExcelComponent} from '../import-payment-object-excel/import-payment-object-excel.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {CoreModule} from '../../core/core.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {BackupDatabaseComponent} from '../backup-database/backup-database.component';
import {RepositoryModule} from '../../repository/repository.module';
import {MessagesModule} from '../../messages/messages.module';
import {UpdatePaymentGroupComponent} from '../update-payment-group/update-payment-group.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ImportExportComponent', () => {
  let component: DataManagementComponent;
  let fixture: ComponentFixture<DataManagementComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [DataManagementComponent, ImportPaymentObjectExcelComponent, UpdatePaymentGroupComponent, BackupDatabaseComponent],
    imports: [ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, MessagesModule],
    providers: [RestUrlEnv, RestDataSource, BsModalService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
