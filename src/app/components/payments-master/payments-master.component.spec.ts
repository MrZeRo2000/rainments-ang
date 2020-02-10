import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMasterComponent } from './payments-master.component';
import {PaymentsDateSelectionComponent} from '../payments-date-selection/payments-date-selection.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('PaymentsMasterComponent', () => {
  let component: PaymentsMasterComponent;
  let fixture: ComponentFixture<PaymentsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ PaymentsMasterComponent, PaymentsDateSelectionComponent ]
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
