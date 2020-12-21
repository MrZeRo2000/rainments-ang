import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentObject} from '../../model/payment-object';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectTotals} from '../../model/payment-object-totals';
import {PaymentObjectPeriodRepository} from '../../repository/payment-object-period-repository';
import {HttpParams} from '@angular/common/http';
import {DateGenerator} from '../../core/utils/date-generator';

@Component({
  selector: 'app-payments-master',
  templateUrl: './payments-master.component.html',
  styleUrls: ['./payments-master.component.scss']
})
export class PaymentsMasterComponent extends CommonTableComponent<PaymentObjectTotals> implements OnInit {
  private KEY_ID = 'id';

  paymentObjectId: number;
  paymentObjectTotals: PaymentObjectTotals;

  selectedDate: Date;

  constructor(public repository: PaymentObjectPeriodRepository, private route: ActivatedRoute, private router: Router) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams()
      .append('paymentObjectId', this.paymentObjectId.toString())
      .append('currentDate', DateGenerator.getConvertedPeriodDate(DateGenerator.getCurrentDate()).toJSON())
      ;
  }

  ngOnInit() {
    super.ngOnInit();
    this.repository.getLoadSuccessObservable().subscribe(v => {
      if(v) {
        this.paymentObjectTotals = this.repository.getData()[0];
      }
    });
  }

  onSelectDate(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  onPaymentObject(paymentObject: PaymentObject) {
    // this.paymentObject = paymentObject;
  }
}
