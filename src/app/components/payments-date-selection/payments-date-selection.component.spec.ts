import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDateSelectionComponent } from './payments-date-selection.component';

describe('PaymentsDateSelectionComponent', () => {
  let component: PaymentsDateSelectionComponent;
  let fixture: ComponentFixture<PaymentsDateSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsDateSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
