import {Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {PaymentSummary} from '../../model/payment-summary';
import {Payment} from '../../model/payment';

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  styleUrls: ['./payments-summary.component.scss']
})
export class PaymentsSummaryComponent implements OnInit, DoCheck {
  @Input()
  selectedItems: Set<Payment>;

  private selectedItemsDiff: IterableDiffer<Payment>;

  summaryData: Array<PaymentSummary> = new Array<PaymentSummary>();

  constructor(protected readRepository: PaymentRefsRepository, private selectedItemsDiffers: IterableDiffers) {
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
    const selectedSummary: PaymentSummary = new PaymentSummary('Selected', 0, 0);

    data.reduce((accumulator, currentValue) => {

      if (currentValue.paymentGroup) {
        const v = accumulator.find(value => value.groupName === currentValue.paymentGroup.name);
        if (v === undefined) {
          accumulator.push(new PaymentSummary(currentValue.paymentGroup.name, currentValue.paymentAmount, currentValue.commissionAmount));
        } else {
          v.addAmounts(currentValue.paymentAmount, currentValue.commissionAmount);
        }
      }

      totalSummary.addAmounts(currentValue.paymentAmount, currentValue.commissionAmount);

      if (this.selectedItems && this.selectedItems.has(currentValue)) {
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

  getTotalSummary(): PaymentSummary {
    return this.summaryData[0];
  }

  getSelectedSummary(): PaymentSummary {
    return this.summaryData[1];
  }

  hasSelection(): boolean {
    return this.selectedItems && this.selectedItems.size > 0;
  }

  getGroupSummary(): PaymentSummary[] {
    return this.summaryData.slice(2) || [];
  }
}
