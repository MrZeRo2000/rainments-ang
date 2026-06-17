import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import { HttpParams } from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {MessageComponent} from "../../messages/message.component";
import {PaymentsDateSelectionComponent} from "../payments-date-selection/payments-date-selection.component";
import {ReportNavComponent} from "../../core/components/report-nav/report-nav.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {PaymentsTableComponent} from "../payments-table/payments-table.component";
import {PAYMENT_OBJECT_PERIOD_READ_REPOSITORY} from "../../repository/repository-tokens";

@Component({
  selector: 'app-payments-master',
  templateUrl: './payments-master.component.html',
  imports: [
    MessageComponent,
    PaymentsDateSelectionComponent,
    ReportNavComponent,
    LoadingProgressComponent,
    PaymentsTableComponent
  ],
  styleUrls: ['./payments-master.component.scss']
})
export class PaymentsMasterComponent extends CommonTableComponent<PaymentObjectTotals> {
  private route = inject(ActivatedRoute)

  paymentObjectId = Number.parseInt(this.route.snapshot.params['id'], 0);

  selectedDate = signal<Date | undefined>(undefined);

  paymentObjectTotals = computed(() => this.readRepository.dataSignal()[0]);

  protected override httpParams = new HttpParams()
    .append('paymentObjectId', this.paymentObjectId.toString())
    .append('currentDate', DateGenerator.getConvertedPeriodDate(DateGenerator.getCurrentDate()).toJSON());

  constructor() {
    super(inject(PAYMENT_OBJECT_PERIOD_READ_REPOSITORY));
  }

  onSelectDate(selectedDate: Date) {
    this.selectedDate.set(selectedDate);
  }
}
