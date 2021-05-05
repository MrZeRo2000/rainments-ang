import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';

@Component({
  selector: 'app-reports-chart-date-totals',
  templateUrl: './reports-chart-date-totals.component.html',
  styleUrls: ['./reports-chart-date-totals.component.scss']
})
export class ReportsChartDateTotalsComponent implements OnInit, OnChanges {

  @Input()
  payments: Array<Payment>;

  paymentsDateTotals: Array<Payment> = []

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName === 'payments') {
        const changedProp = changes[propName];
        this.paymentsDateTotals = PaymentUtils.groupBy(changedProp.currentValue, ['periodDate'])
      }
    }
  }

}
