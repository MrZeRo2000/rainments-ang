import { Component, OnInit } from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {Router} from '@angular/router';
import {CommonTableComponent} from '../../core/table/common-table-component';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends CommonTableComponent<PaymentObject> implements OnInit {

  constructor(public repository: PaymentObjectRepository, private router: Router) {
    super(repository);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  onSelectPaymentObject(event, id: number) {
    event.preventDefault();
    this.router.navigateByUrl('/payments/' + id).then();
  }
}
