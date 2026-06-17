import {Component, inject, input, OnInit} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
import {map, tap} from 'rxjs';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {DisplayIconElementComponent} from '../../core/components/display-icon-element/display-icon-element.component';

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
    imports: [
      BsDropdownModule,
      DisplayIconElementComponent,
      ReactiveFormsModule
    ],
    styleUrls: ['./reports-chart-date-totals-display-options.component.scss']
})
export class ReportsChartDateTotalsDisplayOptionsComponent implements OnInit {
  private fb = inject(FormBuilder)

  ChartStyle = ChartStyle;

  paymentObjectId = input<number>();

  displayOptions: ReportsChartDateTotalsDisplayOptions;

  displayOptionsForm = this.fb.group({
    chartStyle: this.fb.control<string | null>(null)
  });

  // Output derived from the form: each user change persists and re-emits the options.
  // The initial seed (ngOnInit) uses emitEvent:false, so it never fires here.
  selectionChanged = outputFromObservable(
    this.displayOptionsForm.valueChanges.pipe(
      tap(value => {
        Object.assign(this.displayOptions, value);
        this.displayOptions.saveToLocalStorage(this.paymentObjectId());
      }),
      map(() => this.displayOptions)
    )
  );

  ngOnInit(): void {
    this.displayOptions = ReportsChartDateTotalsDisplayOptions.fromLocalStorage(this.paymentObjectId());
    this.displayOptionsForm.setValue({chartStyle: this.displayOptions.chartStyle}, {emitEvent: false});
  }
}
