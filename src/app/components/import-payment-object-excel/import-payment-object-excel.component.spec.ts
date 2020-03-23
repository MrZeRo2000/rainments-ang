import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPaymentObjectExcelComponent } from './import-payment-object-excel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {PaymentRepository} from '../../repository/payment-repository';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {ImportPaymentObjectRepository} from '../../repository/import-payment-object-repository';

describe('ImportPaymentObjectExcelComponent', () => {
  let component: ImportPaymentObjectExcelComponent;
  let fixture: ComponentFixture<ImportPaymentObjectExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPaymentObjectExcelComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, CoreModule],
      providers: [RestUrlEnv, RestDataSource, PaymentObjectRepository, ImportPaymentObjectRepository]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPaymentObjectExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
