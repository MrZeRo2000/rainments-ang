import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableDisplayOptionsComponent } from './payments-table-display-options.component';
import {CoreModule} from '../../core/core.module';

describe('PaymentsTableDisplayOptionsComponent', () => {
  let component: PaymentsTableDisplayOptionsComponent;
  let fixture: ComponentFixture<PaymentsTableDisplayOptionsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsTableDisplayOptionsComponent ],
      imports: [CoreModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableDisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
