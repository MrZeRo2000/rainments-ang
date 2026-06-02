import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseCommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import {PaymentObjectTotalsRepository} from '../../repository/payment-object-totals-repository';
import { HttpParams } from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {MessageComponent} from "../../messages/message.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ReportNavComponent} from "../../core/components/report-nav/report-nav.component";
import {ShortMonthYearPipe} from "../../core/pipes/short-month-year.pipe";
import {ColoredValueLabelComponent} from "../../core/components/colored-value-label/colored-value-label.component";
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  imports: [
    MessageComponent,
    FaIconComponent,
    ReportNavComponent,
    ShortMonthYearPipe,
    ColoredValueLabelComponent,
    AmountPipe,
    LoadingProgressComponent
  ],
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends BaseCommonTableComponent<PaymentObjectTotals> implements OnInit {
  private router = inject(Router)

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public repository: PaymentObjectTotalsRepository) {
    super(repository);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams()
      .append('currentDate', DateGenerator.getConvertedPeriodDate(DateGenerator.getCurrentDate()).toJSON())
      ;
  }

  getPaymentObjectTotals(): PaymentObjectTotals[] {
    return this.repository.getData();
  }

  onSelectPaymentObject(event, item: PaymentObjectTotals) {
    event.preventDefault();
    this.router.navigateByUrl('/payments/' + item.paymentObject.id).then();
  }

  onReportPaymentObject(event, item: PaymentObjectTotals) {
    event.preventDefault();
    this.router.navigateByUrl('/reports/' + item.paymentObject.id).then();
  }
}
