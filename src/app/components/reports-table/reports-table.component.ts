import {Component, Input, OnInit} from '@angular/core';
import {PaymentRep} from '../../model/payment-rep';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit {

  @Input()
  paymentRep: PaymentRep;

  constructor() { }

  ngOnInit(): void {
  }

}
