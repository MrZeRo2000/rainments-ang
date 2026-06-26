import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDateSelectionComponent } from './payments-date-selection.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('PaymentsDateSelectionComponent', () => {
  let component: PaymentsDateSelectionComponent;
  let fixture: ComponentFixture<PaymentsDateSelectionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [PaymentsDateSelectionComponent, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
