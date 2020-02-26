import { Component, OnInit } from '@angular/core';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {PaymentSummary} from '../../model/payment-summary';

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  styleUrls: ['./payments-summary.component.scss']
})
export class PaymentsSummaryComponent implements OnInit {
  summaryData: Array<PaymentSummary> = new Array<PaymentSummary>();

  constructor(protected readRepository: PaymentRefsRepository) {
    // Might not be needed
    this.calcSummary();
    this.readRepository.getLoadSuccessObservable().subscribe(v => {
      if (v) {
        this.calcSummary();
      } else {
        this.clearSummary();
      }
    });
  }

  private calcSummary(): void {
    this.summaryData.length = 0;

    const data = (this.readRepository.getData()[0] && this.readRepository.getData()[0].paymentList) || [];
    const totalSummary: PaymentSummary = new PaymentSummary('Total', 0, 0);

    data.reduce((accumulator, currentValue) => {
      const v = accumulator.find(value => value.groupName === currentValue.paymentGroup.name);
      if (v === undefined) {
        accumulator.push(new PaymentSummary(currentValue.paymentGroup.name, currentValue.paymentAmount, currentValue.commissionAmount));
      } else {
        v.paymentAmount = v.paymentAmount + currentValue.paymentAmount;
        v.commissionAmount = v.commissionAmount + currentValue.commissionAmount;
      }
      totalSummary.paymentAmount += currentValue.paymentAmount;
      totalSummary.commissionAmount += currentValue.commissionAmount;
      return accumulator;
    }, this.summaryData);
    this.summaryData.unshift(totalSummary);
  }


  private clearSummary(): void {
    this.summaryData.length = 0;
  }

  ngOnInit() {
  }

  getTotalSummary(): PaymentSummary {
    return this.summaryData[0];
  }

  getGroupSummary(): PaymentSummary[] {
    return this.summaryData.slice(1) || [];
  }
}
