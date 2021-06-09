import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentRep} from '../../model/payment-rep';
import {PaymentRepRepository} from '../../repository/payment-rep-repository';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {Subscription} from 'rxjs';
import {SelectableItem} from '../../core/components/drop-down-multi-select/drop-down-multi-select.component';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';

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

  readonly paymentObjectId: number;
  dateRange: Date[];
  minSelectionDate: Date;
  maxSelectionDate: Date;

  paymentRep: PaymentRep;
  repositoryPaymentList: Array<Payment> = [];
  displayPaymentList: Array<Payment> = [];

  selectedGroups: SelectableItem[];
  selectedProducts: SelectableItem[];
  selectedColumns: Array<string>;
  selectedControlTab: ControlTab = ControlTab.Chart;

  private readonly loadSuccessSubscription: Subscription;

  constructor(public repository: PaymentRepRepository, private route: ActivatedRoute) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);

    const dateEnd = DateGenerator.getCurrentMonthStartDate();
    const dateStart = new Date(dateEnd.getFullYear() - 1, 0, 1);
    this.dateRange = [dateStart, dateEnd];

    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 1);

    this.selectedColumns = ['periodDate','paymentGroup','product'];

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

  private getSelectableItems(selectedItems: Array<SelectableItem>, callback: any) {
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

  public selectedGroupsChanged(items: Array<SelectableItem>): void {
    this.selectedGroups = items;
    this.applyFilters();
  }

  public selectedProductsChanged(items: Array<SelectableItem>): void {
    this.selectedProducts = items;
    this.applyFilters();
  }

  public selectedColumnsChanged(items: Array<string>): void {
    this.selectedColumns = items;
    this.applyFilters();
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
