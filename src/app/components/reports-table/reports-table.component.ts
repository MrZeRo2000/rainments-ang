import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentAmountSummary} from '../../model/payment-amount-summary';
import {PaymentUtils} from '../../utils/payment-utils';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit, OnChanges {

  @Input()
  payments: Array<Payment>;

  @Input()
  columns: Array<string>;

  paymentAmountSummary: PaymentAmountSummary;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName === 'payments') {
        const changedProp = changes[propName];
        this.paymentAmountSummary = PaymentUtils.calcPaymentAmountSummary(changedProp.currentValue);
      }
    }
  }

}
