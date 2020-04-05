import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableDisplayOptionsComponent } from './payments-table-display-options.component';

describe('PaymentsTableDisplayOptionsComponent', () => {
  let component: PaymentsTableDisplayOptionsComponent;
  let fixture: ComponentFixture<PaymentsTableDisplayOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTableDisplayOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableDisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
