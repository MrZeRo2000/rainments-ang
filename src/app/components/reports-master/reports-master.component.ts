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
  dateStart: Date;
  dateEnd: Date;

  paymentRep: PaymentRep;

  private readonly loadSuccessSubscription: Subscription;

  constructor(public repository: PaymentRepRepository, private route: ActivatedRoute) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);
    this.dateEnd = DateGenerator.getCurrentMonthStartDate();
    this.dateStart = new Date(this.dateEnd.getFullYear() - 1, 0, 1);

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
      .append('paymentPeriodDateStart', DateGenerator.getConvertedPeriodDate(this.dateStart).toJSON())
      .append('paymentPeriodDateEnd', DateGenerator.getConvertedPeriodDate(this.dateEnd).toJSON())
  }

}
