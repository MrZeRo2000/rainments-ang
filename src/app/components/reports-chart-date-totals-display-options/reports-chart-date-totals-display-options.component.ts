import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

export enum ChartStyle {
  BarChart = "Bar Chart",
  StackedBarChart = "Stacked Bar Chart",
}

export class ReportsChartDateTotalsDisplayOptions {
  static KEY = 'reportsChartDateTotalsDisplayOptions';

  public chartStyle: string;

  public static fromLocalStorage(): ReportsChartDateTotalsDisplayOptions {
    const instance = new ReportsChartDateTotalsDisplayOptions();
    instance.loadFromLocalStorage();

    return instance;
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(ReportsChartDateTotalsDisplayOptions.KEY, JSON.stringify(this));
  }

  public loadDefaults(): void {
    this.chartStyle = ChartStyle.BarChart;
  }

  public loadFromLocalStorage(): void {
    const localItem = localStorage.getItem(ReportsChartDateTotalsDisplayOptions.KEY);
    this.loadDefaults();
    if (localItem !== null) {
      try {
        const localObject = JSON.parse(localItem);
        this.chartStyle = localObject.chartStyle;
      } catch (e) {
        this.loadDefaults();
      }
    }
  }
}

@Component({
  selector: 'app-reports-chart-date-totals-display-options',
  templateUrl: './reports-chart-date-totals-display-options.component.html',
  styleUrls: ['./reports-chart-date-totals-display-options.component.scss']
})
export class ReportsChartDateTotalsDisplayOptionsComponent implements OnInit {

  ChartStyle = ChartStyle;

  displayOptionsForm: FormGroup;

  displayOptions: ReportsChartDateTotalsDisplayOptions = ReportsChartDateTotalsDisplayOptions.fromLocalStorage();

  @Output()
  selectionChanged = new EventEmitter<ReportsChartDateTotalsDisplayOptions>();

  constructor(private fb: FormBuilder) { }

  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
        chartStyle: [this.displayOptions?.chartStyle]
      }
    );

    formGroup.valueChanges.subscribe((value => {
      Object.assign(this.displayOptions, value);
      this.displayOptions.saveToLocalStorage();
      this.selectionChanged.emit(this.displayOptions);
    }))

    return formGroup;
  }

  ngOnInit(): void {
    this.displayOptionsForm = this.buildForm();
  }

}
