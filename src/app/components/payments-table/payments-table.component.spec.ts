import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PaymentsSummaryComponent} from '../payments-summary/payments-summary.component';
import {RepositoryModule} from '../../repository/repository.module';
import {PaymentsTableDisplayOptionsComponent} from '../payments-table-display-options/payments-table-display-options.component';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTableComponent, PaymentsSummaryComponent, PaymentsTableDisplayOptionsComponent],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule]
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
