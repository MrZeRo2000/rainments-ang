import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMasterComponent } from './payments-master.component';
import {PaymentsDateSelectionComponent} from '../payments-date-selection/payments-date-selection.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PaymentsTableComponent} from '../payments-table/payments-table.component';

describe('PaymentsMasterComponent', () => {
  let component: PaymentsMasterComponent;
  let fixture: ComponentFixture<PaymentsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ PaymentsMasterComponent, PaymentsDateSelectionComponent, PaymentsTableComponent ]
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
