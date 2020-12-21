import { Component, OnInit } from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {Router} from '@angular/router';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import {PaymentObjectTotalsRepository} from '../../repository/payment-object-totals-repository';
import {HttpParams} from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends CommonTableComponent<PaymentObjectTotals> implements OnInit {

  constructor(public repository: PaymentObjectTotalsRepository, private router: Router) {
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
