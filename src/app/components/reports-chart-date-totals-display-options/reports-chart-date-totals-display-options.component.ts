import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

export enum ChartStyle {
  BarChart = "Bar Chart",
  StackedBarChart = "Stacked Bar Chart",
  SideBySideBarChart = "Side by Side Bar Chart",
}

export class ReportsChartDateTotalsDisplayOptions {
  static KEY = 'reportsChartDateTotalsDisplayOptions';

  public chartStyle: string;

  public static fromLocalStorage(paymentObjectId: number): ReportsChartDateTotalsDisplayOptions {
    const instance = new ReportsChartDateTotalsDisplayOptions();
    instance.loadFromLocalStorage(paymentObjectId);

    return instance;
  }

  public saveToLocalStorage(paymentObjectId: number): void {
    localStorage.setItem(`${ReportsChartDateTotalsDisplayOptions.KEY}${paymentObjectId}`, JSON.stringify(this));
  }

  public loadDefaults(): void {
    this.chartStyle = ChartStyle.BarChart;
  }

  public loadFromLocalStorage(paymentObjectId: number): void {
    const localItem = localStorage.getItem(`${ReportsChartDateTotalsDisplayOptions.KEY}${paymentObjectId}`);
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

  displayOptionsForm: UntypedFormGroup;

  displayOptions: ReportsChartDateTotalsDisplayOptions;

  @Input()
  paymentObjectId: number;

  @Output()
  selectionChanged = new EventEmitter<ReportsChartDateTotalsDisplayOptions>();

  constructor(private fb: UntypedFormBuilder) { }

  private buildForm(): UntypedFormGroup {
    const formGroup = this.fb.group({
        chartStyle: [this.displayOptions?.chartStyle]
      }
    );

    formGroup.valueChanges.subscribe((value => {
      Object.assign(this.displayOptions, value);
      this.displayOptions.saveToLocalStorage(this.paymentObjectId);
      this.selectionChanged.emit(this.displayOptions);
    }))

    return formGroup;
  }

  ngOnInit(): void {
    this.displayOptions = ReportsChartDateTotalsDisplayOptions.fromLocalStorage(this.paymentObjectId);
    this.displayOptionsForm = this.buildForm();
  }

}
