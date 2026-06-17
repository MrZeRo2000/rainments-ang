import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsChartDateTotalsDisplayOptionsComponent } from './reports-chart-date-totals-display-options.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';

describe('ReportsChartDateTotalsDisplayOptionsComponent', () => {
  let component: ReportsChartDateTotalsDisplayOptionsComponent;
  let fixture: ComponentFixture<ReportsChartDateTotalsDisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsChartDateTotalsDisplayOptionsComponent, ReactiveFormsModule, FontAwesomeIconsModule]
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
