import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSummaryComponent } from './payments-summary.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {PaymentRepository} from '../../repository/payment-repository';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {IterableDiffers} from '@angular/core';

describe('PaymentsSummaryComponent', () => {
  let component: PaymentsSummaryComponent;
  let fixture: ComponentFixture<PaymentsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsSummaryComponent ],
      providers: [RestUrlEnv, RestDataSource, PaymentRefsRepository, IterableDiffers],
      imports: [HttpClientTestingModule, CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
