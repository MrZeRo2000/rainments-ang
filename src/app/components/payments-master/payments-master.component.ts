import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaymentObject} from '../../model/payment-object';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';

@Component({
  selector: 'app-payments-master',
  templateUrl: './payments-master.component.html',
  styleUrls: ['./payments-master.component.scss']
})
export class PaymentsMasterComponent extends CommonTableComponent<PaymentObject> implements OnInit {
  private KEY_ID = 'id';

  paymentObjectId: number;
  paymentObject: PaymentObject;

  selectedDate: Date;

  constructor(public repository: PaymentObjectRepository, private route: ActivatedRoute) {
    super(repository);
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);
  }

  ngOnInit() {
    super.ngOnInit();
    this.repository.getLoadSuccessObservable().subscribe(v => {
      if(v) {
        this.paymentObject = this.repository.getData().filter(value => value.id === this.paymentObjectId)[0];
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
