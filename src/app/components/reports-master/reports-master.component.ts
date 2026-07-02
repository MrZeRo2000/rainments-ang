import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../core/date/app-date-formats';
import {NavListSelectorComponent} from '../../core/components/nav-list-selector/nav-list-selector.component';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentRep} from '../../model/payment-rep';
import {Payment} from '../../model/payment';
import {DateGenerator} from '../../core/utils/date-generator';
import {PaymentUtils} from '../../utils/payment-utils';
import {SelectableItem} from '../../core/model/selectable-item';
import {
  ReportsTableDisplayOptions,
  ReportsTableDisplayOptionsComponent
} from '../reports-table-display-options/reports-table-display-options.component';
import {
  ReportsChartDateTotalsDisplayOptions, ReportsChartDateTotalsDisplayOptionsComponent
} from '../reports-chart-date-totals-display-options/reports-chart-date-totals-display-options.component';
import {
  DropDownMultiSelectComponent
} from "../../core/components/drop-down-multi-select/drop-down-multi-select.component";
import {ReportsChartDateTotalsComponent} from "../reports-chart-date-totals/reports-chart-date-totals.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {ReportsTableComponent} from "../reports-table/reports-table.component";
import {PAYMENT_REP_READ_REPOSITORY} from "../../repository/repository-tokens";

enum ControlTab {
  Chart = 'Chart',
  Table = 'Table'
}

@Component({
  selector: 'app-reports-master',
  templateUrl: './reports-master.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NavListSelectorComponent,
    DropDownMultiSelectComponent,
    ReportsChartDateTotalsDisplayOptionsComponent,
    ReportsChartDateTotalsComponent,
    LoadingProgressComponent,
    ReportsTableComponent,
    ReportsTableDisplayOptionsComponent
  ],
  providers: [
    // Native date adapter with dotted dd.MM.yyyy input (see AppDateAdapter).
    provideNativeDateAdapter(APP_DATE_FORMATS),
    {provide: DateAdapter, useClass: AppDateAdapter},
  ],
  styleUrls: ['./reports-master.component.scss']
})
export class ReportsMasterComponent extends CommonTableComponent<PaymentRep> {
  private route = inject(ActivatedRoute)

  ControlTab = ControlTab;
  controlTabs = [ControlTab.Chart, ControlTab.Table];

  private static readonly PERIOD_DATE_COLUMN = 'periodDate';
  private static readonly PAYMENT_GROUP_COLUMN = 'paymentGroup';
  private static readonly PRODUCT_COLUMN = 'product';
  private static readonly COLUMNS = [ReportsMasterComponent.PERIOD_DATE_COLUMN, ReportsMasterComponent.PAYMENT_GROUP_COLUMN, ReportsMasterComponent.PRODUCT_COLUMN];

  readonly paymentObjectId = Number.parseInt(this.route.snapshot.params['id'], 10);

  dateRange = signal<Date[]>([]);
  minSelectionDate: Date;
  maxSelectionDate: Date;

  // Backs the Material date-range picker inputs (start/end). Its value changes
  // are bridged to the existing dateRange()/loadRepositoryData() flow.
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  selectedControlTab = signal<ControlTab>(ControlTab.Chart);
  selectedColumns = signal<Array<string>>(ReportsMasterComponent.COLUMNS);

  selectedGroups = signal<Array<SelectableItem<string>> | undefined>(undefined);
  selectedProducts = signal<Array<SelectableItem<string>> | undefined>(undefined);

  tableDisplayOptions = ReportsTableDisplayOptions.fromLocalStorage();
  chartDisplayOptions = signal<ReportsChartDateTotalsDisplayOptions>(
    ReportsChartDateTotalsDisplayOptions.fromLocalStorage(this.paymentObjectId));

  paymentRep = computed(() => this.readRepository.dataSignal()[0]);
  private repositoryPaymentList = computed(() => this.paymentRep()?.paymentRepList ?? []);

  displayPaymentList = computed(() => {
    const groups = this.selectedGroups();
    const products = this.selectedProducts();
    if (!groups || !products) {
      return [];
    }
    const selectedGroupNames = SelectableItem.getSelectedItemValues(groups);
    const selectedProductNames = SelectableItem.getSelectedItemValues(products);
    const filteredPaymentList = this.repositoryPaymentList().filter(
      v => selectedGroupNames.includes(v.paymentGroup.name) && selectedProductNames.includes(v.product.name)
    );
    return PaymentUtils.groupBy(filteredPaymentList, this.selectedColumns());
  });

  constructor() {
    super(inject(PAYMENT_REP_READ_REPOSITORY));

    const dateEnd = DateGenerator.getCurrentMonthStartDate();
    //const dateStart = new Date(dateEnd.getFullYear() - 1, 0, 1);
    let dateStart = new Date(dateEnd)
    dateStart.setMonth(dateEnd.getMonth() - 13);
    this.dateRange.set([dateStart, dateEnd]);
    this.dateRangeForm.setValue({start: dateStart, end: dateEnd}, {emitEvent: false});

    // A completed range (both ends picked) drives the reload, mirroring the old
    // (bsValueChange) handler.
    this.dateRangeForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(({start, end}) => {
      if (start && end) {
        this.onDateRangeValueChange([start, end]);
      }
    });

    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 1);

    // Rebuild the group/product filters when new data loads, preserving prior selection.
    effect(() => {
      const rep = this.paymentRep();
      if (rep) {
        this.selectedGroups.set(
          this.buildSelectableItems(untracked(() => this.selectedGroups()), rep.paymentRepList, v => v.paymentGroup.name));
        this.selectedProducts.set(
          this.buildSelectableItems(untracked(() => this.selectedProducts()), rep.paymentRepList, v => v.product.name));
      }
    });
  }

  protected override loadRepositoryData(): void {
    this.readRepository.loadData({
      params: new HttpParams()
        .append('paymentObjectId', this.paymentObjectId.toString())
        .append('paymentPeriodDateStart', DateGenerator.getConvertedPeriodDate(this.dateRange()[0]).toJSON())
        .append('paymentPeriodDateEnd', DateGenerator.getConvertedPeriodDate(this.dateRange()[1]).toJSON())
    });
  }

  private buildSelectableItems(
    prev: Array<SelectableItem<string>> | undefined,
    list: Array<Payment>,
    callback: (payment: Payment) => string): Array<SelectableItem<string>> {
    const prevSelected = prev?.filter(i => i.isSelected).map(i => i.value);
    return [...new Set(list.map(callback))].map(
      v => new SelectableItem(v, !prevSelected || prevSelected.includes(v)));
  }

  onDateRangeValueChange(value: Date[]): void {
    const current = this.dateRange();
    if (this.paymentRep() &&
      current.length === 2 &&
      ((current[0] !== value[0]) || (current[1] !== value[1]))
    ) {
      this.dateRange.set(value);
      this.loadRepositoryData();
    }
  }

  selectedGroupsChanged(items: Array<SelectableItem<string>>): void {
    this.selectedGroups.set(items);
  }

  selectedProductsChanged(items: Array<SelectableItem<string>>): void {
    this.selectedProducts.set(items);
  }

  tableDisplayOptionsChanged(displayOptions: ReportsTableDisplayOptions): void {
    this.tableDisplayOptions.saveToLocalStorage();
    this.selectedColumns.set(ReportsMasterComponent.COLUMNS.filter(
      s => (s === ReportsMasterComponent.PERIOD_DATE_COLUMN && this.tableDisplayOptions.showDate) ||
        (s === ReportsMasterComponent.PAYMENT_GROUP_COLUMN && this.tableDisplayOptions.showGroup) ||
        (s === ReportsMasterComponent.PRODUCT_COLUMN && this.tableDisplayOptions.showProduct)
    ));
  }

  chartDisplayOptionsChanged(displayOptions: ReportsChartDateTotalsDisplayOptions): void {
    this.chartDisplayOptions.set({...displayOptions} as ReportsChartDateTotalsDisplayOptions);
  }

  selectControlTabClick(selectedControlTab: string): void {
    this.selectedControlTab.set(selectedControlTab as ControlTab);
  }
}
