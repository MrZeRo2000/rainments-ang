import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsChartDateTotalsComponent } from './reports-chart-date-totals.component';

describe('ReportsChartDateTotalsComponent', () => {
  let component: ReportsChartDateTotalsComponent;
  let fixture: ComponentFixture<ReportsChartDateTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsChartDateTotalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsChartDateTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
