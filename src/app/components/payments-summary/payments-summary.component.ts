import {Component, computed, inject, input} from '@angular/core';
import {PaymentGroupAmountSummary} from '../../model/payment-group-amount-summary';
import {Payment} from '../../model/payment';
import {PaymentGroup} from '../../model/payment-group';
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {NgStyle} from "@angular/common";
import {PAYMENT_REFS_READ_REPOSITORY} from "../../repository/repository-tokens";

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  imports: [
    AmountPipe,
    NgStyle
  ],
  styleUrls: ['./payments-summary.component.scss']
})
export class PaymentsSummaryComponent {
  private readRepository = inject(PAYMENT_REFS_READ_REPOSITORY)

  selectedItems = input<Array<Payment>>([]);

  private summary = computed(() => {
    const payments = this.readRepository.dataSignal()[0]?.paymentList ?? [];
    const selected = this.selectedItems();

    const total = new PaymentGroupAmountSummary(new PaymentGroup(-1, 'Total'), 0, 0);
    const selectedSummary = new PaymentGroupAmountSummary(new PaymentGroup(-2, 'Selected'), 0, 0);
    const groups: Array<PaymentGroupAmountSummary> = [];

    payments.forEach(payment => {
      if (payment.paymentGroup) {
        const group = groups.find(value => value.paymentGroup.id === payment.paymentGroup.id);
        if (group === undefined) {
          groups.push(new PaymentGroupAmountSummary(payment.paymentGroup, payment.paymentAmount, payment.commissionAmount));
        } else {
          group.addAmounts(payment.paymentAmount, payment.commissionAmount);
        }
      }

      total.addAmounts(payment.paymentAmount, payment.commissionAmount);

      if (selected.indexOf(payment) > -1) {
        selectedSummary.addAmounts(payment.paymentAmount, payment.commissionAmount);
      }
    });

    return {total, selectedSummary, groups};
  });

  totalSummary = computed(() => this.summary().total);
  selectedSummary = computed(() => this.summary().selectedSummary);
  groupSummary = computed(() => this.summary().groups);
  hasSelection = computed(() => this.selectedItems().length > 0);
}
