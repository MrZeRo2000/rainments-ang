import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMasterComponent } from './payments-master.component';
import {PaymentsDateSelectionComponent} from '../payments-date-selection/payments-date-selection.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PaymentsTableComponent} from '../payments-table/payments-table.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {MessagesModule} from '../../messages/messages.module';
import {CoreModule} from '../../core/core.module';
import {PaymentsSummaryComponent} from '../payments-summary/payments-summary.component';
import {RepositoryModule} from '../../repository/repository.module';
import {PaymentsTableDisplayOptionsComponent} from '../payments-table-display-options/payments-table-display-options.component';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsMasterComponent', () => {
  let component: PaymentsMasterComponent;
  let fixture: ComponentFixture<PaymentsMasterComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [PaymentsMasterComponent, PaymentsDateSelectionComponent, PaymentsTableComponent, PaymentsSummaryComponent,
        PaymentsTableDisplayOptionsComponent],
    imports: [RouterTestingModule, ReactiveFormsModule, ModalModule.forRoot(),
        MessagesModule, CoreModule, RepositoryModule, FontAwesomeIconsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
