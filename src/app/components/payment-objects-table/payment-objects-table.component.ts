import { Component, OnInit } from '@angular/core';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  styleUrls: ['./payment-objects-table.component.css']
})
export class PaymentObjectsTableComponent implements OnInit {

  constructor(private repository: PaymentObjectRepository) { }

  ngOnInit() {
    this.repository.loadData();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  onDeleteClick(item: PaymentObject): void {
    alert('OnDelete:' + item.id);
  }

  onEditClick(item: PaymentObject): void {
    alert('OnEdit:' + item.id);
  }

}
