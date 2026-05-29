import {
  Component,
  DoCheck,
  inject,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnInit
} from '@angular/core';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {PaymentGroupAmountSummary} from '../../model/payment-group-amount-summary';
import {Payment} from '../../model/payment';
import {PaymentGroup} from '../../model/payment-group';
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  imports: [
    AmountPipe,
    NgStyle
  ],
  styleUrls: ['./payments-summary.component.scss']
})
export class PaymentsSummaryComponent implements OnInit, DoCheck {
  protected readRepository = inject(PaymentRefsRepository)
  private selectedItemsDiffers = inject(IterableDiffers)

  @Input()
  selectedItems: Array<Payment>;

  private selectedItemsDiff: IterableDiffer<Payment>;

  summaryData: Array<PaymentGroupAmountSummary> = new Array<PaymentGroupAmountSummary>();

  constructor() {
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
    const totalSummary: PaymentGroupAmountSummary = new PaymentGroupAmountSummary(new PaymentGroup(-1, 'Total'), 0, 0);
    const selectedSummary: PaymentGroupAmountSummary = new PaymentGroupAmountSummary(new PaymentGroup(-2, 'Selected'), 0, 0);

    data.reduce((accumulator, currentValue) => {

      if (currentValue.paymentGroup) {
        const v = accumulator.find(value => value.paymentGroup.id === currentValue.paymentGroup.id);
        if (v === undefined) {
          accumulator.push(new PaymentGroupAmountSummary(currentValue.paymentGroup, currentValue.paymentAmount, currentValue.commissionAmount));
        } else {
          v.addAmounts(currentValue.paymentAmount, currentValue.commissionAmount);
        }
      }

      totalSummary.addAmounts(currentValue.paymentAmount, currentValue.commissionAmount);

      if (this.selectedItems && this.selectedItems.indexOf(currentValue) > -1) {
        selectedSummary.addAmounts(currentValue.paymentAmount, currentValue.commissionAmount);
      }

      return accumulator;
    }, this.summaryData);
    this.summaryData.unshift(selectedSummary);
    this.summaryData.unshift(totalSummary);
  }

  private clearSummary(): void {
    this.summaryData.length = 0;
  }

  ngOnInit() {
    if (this.selectedItems) {
      this.selectedItemsDiff = this.selectedItemsDiffers.find(this.selectedItems).create();
    }
  }

  ngDoCheck(): void {
    if (this.selectedItems) {
      const selectedItemsChanges = this.selectedItemsDiff.diff(this.selectedItems);
      if (selectedItemsChanges) {
        this.calcSummary();
      }
    }
  }

  getTotalSummary(): PaymentGroupAmountSummary {
    return this.summaryData[0];
  }

  getSelectedSummary(): PaymentGroupAmountSummary {
    return this.summaryData[1];
  }

  hasSelection(): boolean {
    return this.selectedItems?.length > 0;
  }

  getGroupSummary(): PaymentGroupAmountSummary[] {
    return this.summaryData.slice(2) || [];
  }
}
