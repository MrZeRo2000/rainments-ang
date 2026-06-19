import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSummaryComponent } from './payments-summary.component';
import {PaymentsTableDisplayOptions} from '../payments-table-display-options/payments-table-display-options.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {IterableDiffers} from '@angular/core';
import {RepositoryModule} from '../../repository/repository.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsSummaryComponent', () => {
  let component: PaymentsSummaryComponent;
  let fixture: ComponentFixture<PaymentsSummaryComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [PaymentsSummaryComponent, RepositoryModule],
    providers: [RestUrlEnv, RestDataSource, IterableDiffers, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('paymentsTableDisplayOptions', new PaymentsTableDisplayOptions());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
