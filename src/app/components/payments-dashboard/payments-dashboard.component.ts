import { Component, OnInit } from '@angular/core';
import {CommonTableComponent} from '../../core/common-table-component';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../model/payment-object-repository';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends CommonTableComponent<PaymentObject> implements OnInit {

  constructor(protected repository: PaymentObjectRepository) {
    super(repository);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

}
