import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentRep} from '../../model/payment-rep';
import {PaymentRepRepository} from '../../repository/payment-rep-repository';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reports-master',
  templateUrl: './reports-master.component.html',
  styleUrls: ['./reports-master.component.scss']
})
export class ReportsMasterComponent extends CommonTableComponent<PaymentRep> implements OnInit, OnDestroy {
  private readonly KEY_ID = 'id';

  readonly paymentObjectId: number;
  dateRange: Date[];
  minSelectionDate: Date;
  maxSelectionDate: Date;

  paymentRep: PaymentRep;

  private readonly loadSuccessSubscription: Subscription;

  constructor(public repository: PaymentRepRepository, private route: ActivatedRoute) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);

    const dateEnd = DateGenerator.getCurrentMonthStartDate();
    const dateStart = new Date(dateEnd.getFullYear() - 1, 0, 1);
    this.dateRange = [dateStart, dateEnd];

    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 1);

    this.loadSuccessSubscription = this.repository.getLoadSuccessObservable().subscribe(value => {
      if (value) {
        this.paymentRep = this.repository.getData()[0];
        console.log(JSON.stringify(this.paymentRep));
      }
    })
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.loadSuccessSubscription) {
      this.loadSuccessSubscription.unsubscribe();
    }
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams()
      .append('paymentObjectId', this.paymentObjectId.toString())
      .append('paymentPeriodDateStart', DateGenerator.getConvertedPeriodDate(this.dateRange[0]).toJSON())
      .append('paymentPeriodDateEnd', DateGenerator.getConvertedPeriodDate(this.dateRange[1]).toJSON())
  }

  onDateRangeValueChange(value: Date[]): void {
    if (this.paymentRep &&
      this.dateRange.length === 2 &&
      ((this.dateRange[0] !== value[0]) || (this.dateRange[1] !== value[1]))
    ) {
      this.dateRange = value;
      this.loadRepositoryData();
    }
  }
}
