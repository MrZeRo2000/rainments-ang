import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import { HttpParams } from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {MessageComponent} from "../../messages/message.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ReportNavComponent} from "../../core/components/report-nav/report-nav.component";
import {ShortMonthYearPipe} from "../../core/pipes/short-month-year.pipe";
import {ColoredValueLabelComponent} from "../../core/components/colored-value-label/colored-value-label.component";
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {PAYMENT_OBJECT_TOTALS_READ_REPOSITORY} from "../../repository/repository-tokens";
import {ReadRepository} from "../../core/repository/read-repository";
import {AsyncPipe} from "@angular/common";
import {map} from "rxjs";

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
    LoadingProgressComponent,
    AsyncPipe
  ],
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends CommonTableComponent<PaymentObjectTotals> {
  private router = inject(Router)

  repositoryData$ = this.readRepository.loadDataAction$.pipe(
    map(v => v.map(item => (
      {
        ...item, paymentDate:
        item.paymentDate ? new Date(item.paymentDate) : null
      }
    )))
  )

  constructor() {
    super(inject(PAYMENT_OBJECT_TOTALS_READ_REPOSITORY));
    this.httpParams = new HttpParams()
      .append('currentDate', DateGenerator.getConvertedPeriodDate(DateGenerator.getCurrentDate()).toJSON())
    ;
  }

  get repository(): ReadRepository<PaymentObjectTotals> {
    return this.readRepository;
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
