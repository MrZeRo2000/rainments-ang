import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSummaryComponent } from './payments-summary.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {CoreModule} from '../../core/core.module';
import {IterableDiffers} from '@angular/core';
import {RepositoryModule} from '../../repository/repository.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsSummaryComponent', () => {
  let component: PaymentsSummaryComponent;
  let fixture: ComponentFixture<PaymentsSummaryComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [PaymentsSummaryComponent],
    imports: [CoreModule, RepositoryModule],
    providers: [RestUrlEnv, RestDataSource, IterableDiffers, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
