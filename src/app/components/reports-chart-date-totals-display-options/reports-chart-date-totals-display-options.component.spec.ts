import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsChartDateTotalsDisplayOptionsComponent } from './reports-chart-date-totals-display-options.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';

describe('ReportsChartDateTotalsDisplayOptionsComponent', () => {
  let component: ReportsChartDateTotalsDisplayOptionsComponent;
  let fixture: ComponentFixture<ReportsChartDateTotalsDisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsChartDateTotalsDisplayOptionsComponent ],
      imports: [ReactiveFormsModule, CoreModule]
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
