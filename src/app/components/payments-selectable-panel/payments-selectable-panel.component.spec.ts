import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSelectablePanelComponent } from './payments-selectable-panel.component';

describe('PaymentsSelectablePanelComponent', () => {
  let component: PaymentsSelectablePanelComponent;
  let fixture: ComponentFixture<PaymentsSelectablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsSelectablePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSelectablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
