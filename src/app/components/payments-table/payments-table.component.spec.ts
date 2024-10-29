import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PaymentsSummaryComponent} from '../payments-summary/payments-summary.component';
import {RepositoryModule} from '../../repository/repository.module';
import {PaymentsTableDisplayOptionsComponent} from '../payments-table-display-options/payments-table-display-options.component';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import {PaymentsSelectablePanelComponent} from '../payments-selectable-panel/payments-selectable-panel.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [PaymentsTableComponent, PaymentsSummaryComponent, PaymentsTableDisplayOptionsComponent, PaymentsSelectablePanelComponent],
    imports: [ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, FontAwesomeIconsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
