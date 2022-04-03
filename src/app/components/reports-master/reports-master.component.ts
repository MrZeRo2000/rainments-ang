import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentRep} from '../../model/payment-rep';
import {PaymentRepRepository} from '../../repository/payment-rep-repository';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {Subscription} from 'rxjs';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';
import {SelectableItem} from '../../core/model/selectable-item';
import {ReportsTableDisplayOptions} from '../reports-table-display-options/reports-table-display-options.component';
import {
  ChartStyle,
  ReportsChartDateTotalsDisplayOptions
} from '../reports-chart-date-totals-display-options/reports-chart-date-totals-display-options.component';

enum ControlTab {
  Chart = 'Chart',
  Table = 'Table'
}

@Component({
  selector: 'app-reports-master',
  templateUrl: './reports-master.component.html',
  styleUrls: ['./reports-master.component.scss']
})
export class ReportsMasterComponent extends CommonTableComponent<PaymentRep> implements OnInit, OnDestroy {

  ControlTab = ControlTab;

  private readonly KEY_ID = 'id';

  private static readonly PERIOD_DATE_COLUMN = 'periodDate';
  private static readonly PAYMENT_GROUP_COLUMN = 'paymentGroup';
  private static readonly PRODUCT_COLUMN = 'product';
  private static readonly COLUMNS = [ReportsMasterComponent.PERIOD_DATE_COLUMN, ReportsMasterComponent.PAYMENT_GROUP_COLUMN, ReportsMasterComponent.PRODUCT_COLUMN];

  readonly paymentObjectId: number;
  dateRange: Date[];
  minSelectionDate: Date;
  maxSelectionDate: Date;

  paymentRep: PaymentRep;
  repositoryPaymentList: Array<Payment> = [];
  displayPaymentList: Array<Payment> = [];

  selectedGroups: SelectableItem<string>[];
  selectedProducts: SelectableItem<string>[];
  selectedColumns: Array<string> = ReportsMasterComponent.COLUMNS;
  selectedControlTab: ControlTab = ControlTab.Chart;

  tableDisplayOptions: ReportsTableDisplayOptions = ReportsTableDisplayOptions.fromLocalStorage();

  chartDisplayOptions: ReportsChartDateTotalsDisplayOptions;

  private readonly loadSuccessSubscription: Subscription;

  constructor(public repository: PaymentRepRepository, private route: ActivatedRoute) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);
    this.chartDisplayOptions = ReportsChartDateTotalsDisplayOptions.fromLocalStorage(this.paymentObjectId);

    const dateEnd = DateGenerator.getCurrentMonthStartDate();
    const dateStart = new Date(dateEnd.getFullYear() - 1, 0, 1);
    this.dateRange = [dateStart, dateEnd];

    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 1);

    this.loadSuccessSubscription = this.repository.getLoadSuccessObservable().subscribe(value => {
      if (value) {
        this.paymentRep = this.repository.getData()[0];
        this.repositoryPaymentList = [...this.repository.getData()[0].paymentRepList];

        this.selectedGroups = this.getSelectableItems(this.selectedGroups, v => v.paymentGroup.name);
        this.selectedProducts = this.getSelectableItems(this.selectedProducts, v => v.product.name);

        this.applyFilters();
      }
    })
  }

  private getSelectableItems(selectedItems: Array<SelectableItem<string>>, callback: any) {
    return [... new Set(this.paymentRep.paymentRepList.map(v => callback(v)))]
      .map(v =>
        new SelectableItem(v, !selectedItems || selectedItems.filter(vi => vi.isSelected).map(vn => vn.value).includes(v))
      );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.loadSuccessSubscription) {
      this.loadSuccessSubscription.unsubscribe();
    }
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams()
      .append('paymentObjectId', this.paymentObjectId.toString())
      .append('paymentPeriodDateStart', DateGenerator.getConvertedPeriodDate(this.dateRange[0]).toJSON())
      .append('paymentPeriodDateEnd', DateGenerator.getConvertedPeriodDate(this.dateRange[1]).toJSON())
  }

  onDateRangeValueChange(value: Date[]): void {
    if (this.paymentRep &&
      this.dateRange.length === 2 &&
      ((this.dateRange[0] !== value[0]) || (this.dateRange[1] !== value[1]))
    ) {
      this.dateRange = value;
      this.loadRepositoryData();
    }
  }

  public selectedGroupsChanged(items: Array<SelectableItem<string>>): void {
    this.selectedGroups = items;
    this.applyFilters();
  }

  public selectedProductsChanged(items: Array<SelectableItem<string>>): void {
    this.selectedProducts = items;
    this.applyFilters();
  }

  public tableDisplayOptionsChanged(displayOptions: ReportsTableDisplayOptions) {
    this.tableDisplayOptions.saveToLocalStorage();
    this.selectedColumns = ReportsMasterComponent.COLUMNS.filter(
      s => (s === ReportsMasterComponent.PERIOD_DATE_COLUMN && this.tableDisplayOptions.showDate) ||
        (s === ReportsMasterComponent.PAYMENT_GROUP_COLUMN && this.tableDisplayOptions.showGroup) ||
        (s === ReportsMasterComponent.PRODUCT_COLUMN && this.tableDisplayOptions.showProduct)
    );
    this.applyFilters();
  }

  public chartDisplayOptionsChanged(displayOptions: ReportsChartDateTotalsDisplayOptions) {
    this.chartDisplayOptions = {...displayOptions} as ReportsChartDateTotalsDisplayOptions;
  }

  private applyFilters() {
    const selectedGroupNames = SelectableItem.getSelectedItemValues(this.selectedGroups);
    const selectedProductNames = SelectableItem.getSelectedItemValues(this.selectedProducts);

    const filteredPaymentList = [... this.repositoryPaymentList].filter(
      v => selectedGroupNames.includes(v.paymentGroup.name) && selectedProductNames.includes(v.product.name)
    );

    this.displayPaymentList = PaymentUtils.groupBy(filteredPaymentList, this.selectedColumns);
  }

  selectControlTabClick(selectedControlTab: ControlTab): void {
    this.selectedControlTab = selectedControlTab;
  }
}
