import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsChartDateTotalsDisplayOptionsComponent } from './reports-chart-date-totals-display-options.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('ReportsChartDateTotalsDisplayOptionsComponent', () => {
  let component: ReportsChartDateTotalsDisplayOptionsComponent;
  let fixture: ComponentFixture<ReportsChartDateTotalsDisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsChartDateTotalsDisplayOptionsComponent, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsChartDateTotalsDisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
