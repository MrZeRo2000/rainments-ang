import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import {PaymentsMasterComponent} from '../payments-master/payments-master.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PaymentRepository} from '../../repository/payment-repository';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTableComponent],
      providers: [RestUrlEnv, RestDataSource, PaymentRepository, PaymentRefsRepository, BsModalService ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
