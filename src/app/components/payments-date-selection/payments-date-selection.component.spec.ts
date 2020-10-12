import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDateSelectionComponent } from './payments-date-selection.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';

describe('PaymentsDateSelectionComponent', () => {
  let component: PaymentsDateSelectionComponent;
  let fixture: ComponentFixture<PaymentsDateSelectionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeIconsModule],
      declarations: [ PaymentsDateSelectionComponent ]
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
