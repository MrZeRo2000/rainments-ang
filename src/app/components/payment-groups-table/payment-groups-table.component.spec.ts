import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGroupsTableComponent } from './payment-groups-table.component';

describe('PaymentGroupsTableComponent', () => {
  let component: PaymentGroupsTableComponent;
  let fixture: ComponentFixture<PaymentGroupsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGroupsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
