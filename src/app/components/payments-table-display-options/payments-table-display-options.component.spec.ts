import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableDisplayOptionsComponent, PaymentsTableDisplayOptions } from './payments-table-display-options.component';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';

describe('PaymentsTableDisplayOptionsComponent', () => {
  let component: PaymentsTableDisplayOptionsComponent;
  let fixture: ComponentFixture<PaymentsTableDisplayOptionsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [PaymentsTableDisplayOptionsComponent, FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableDisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('paymentsTableDisplayOptions', new PaymentsTableDisplayOptions());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
