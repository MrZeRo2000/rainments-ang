import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMasterComponent } from './payments-master.component';
import {PaymentsDateSelectionComponent} from '../payments-date-selection/payments-date-selection.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PaymentsTableComponent} from '../payments-table/payments-table.component';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {PaymentRepository} from '../../repository/payment-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesModule} from '../../messages/messages.module';
import {CoreModule} from '../../core/core.module';
import {PaymentsSummaryComponent} from '../payments-summary/payments-summary.component';
import {RepositoryModule} from '../../repository/repository.module';

describe('PaymentsMasterComponent', () => {
  let component: PaymentsMasterComponent;
  let fixture: ComponentFixture<PaymentsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, ModalModule.forRoot(),
        MessagesModule, CoreModule, RepositoryModule],
      providers: [RestUrlEnv, RestDataSource],
      declarations: [ PaymentsMasterComponent, PaymentsDateSelectionComponent, PaymentsTableComponent, PaymentsSummaryComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
