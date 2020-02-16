import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import {PaymentsMasterComponent} from '../payments-master/payments-master.component';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTableComponent]
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
