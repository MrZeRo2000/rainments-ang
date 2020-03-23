import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportComponent } from './import-export.component';
import {ImportPaymentObjectExcelComponent} from '../import-payment-object-excel/import-payment-object-excel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {CoreModule} from '../../core/core.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {ImportPaymentObjectRepository} from '../../repository/import-payment-object-repository';

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportComponent, ImportPaymentObjectExcelComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, CoreModule],
      providers: [RestUrlEnv, RestDataSource, PaymentObjectRepository, ImportPaymentObjectRepository]
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
