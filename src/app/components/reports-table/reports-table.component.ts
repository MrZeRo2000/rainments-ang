import {Component, computed, input} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';
import {ReportsTableDisplayOptions} from '../reports-table-display-options/reports-table-display-options.component';
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {DatePipe, NgStyle} from "@angular/common";

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  imports: [
    AmountPipe,
    NgStyle,
    DatePipe
  ],
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {

  payments = input<Array<Payment>>();

  displayOptions = input<ReportsTableDisplayOptions>();

  paymentAmountSummary = computed(() =>
    this.payments() ? PaymentUtils.calcPaymentAmountSummary(this.payments()) : undefined);

}
