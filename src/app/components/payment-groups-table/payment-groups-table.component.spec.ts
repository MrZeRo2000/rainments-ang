import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGroupsTableComponent } from './payment-groups-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentGroupsTableComponent', () => {
  let component: PaymentGroupsTableComponent;
  let fixture: ComponentFixture<PaymentGroupsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [PaymentGroupsTableComponent, ReactiveFormsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
