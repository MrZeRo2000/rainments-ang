import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDashboardComponent } from './payments-dashboard.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsDashboardComponent', () => {
  let component: PaymentsDashboardComponent;
  let fixture: ComponentFixture<PaymentsDashboardComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [PaymentsDashboardComponent, RouterTestingModule, ReactiveFormsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
