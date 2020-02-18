import { Component, OnInit } from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {Router} from '@angular/router';
import {CommonSimpleTableComponent} from '../../core/table/common-simple-table-component';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent extends CommonSimpleTableComponent<PaymentObject> implements OnInit {

  constructor(protected repository: PaymentObjectRepository, private router: Router) {
    super(repository);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  onSelectPaymentObject(id: number) {
    this.router.navigateByUrl('/payments/' + id);
  }
}
