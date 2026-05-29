import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentAmountSummary} from '../../model/payment-amount-summary';
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
export class ReportsTableComponent implements OnChanges {

  @Input()
  payments: Array<Payment>;

  @Input()
  displayOptions: ReportsTableDisplayOptions;

  paymentAmountSummary: PaymentAmountSummary;

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName === 'payments') {
        const changedProp = changes[propName];
        this.paymentAmountSummary = PaymentUtils.calcPaymentAmountSummary(changedProp.currentValue);
      }
    }
  }

}
