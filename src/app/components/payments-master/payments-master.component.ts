import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payments-master',
  templateUrl: './payments-master.component.html',
  styleUrls: ['./payments-master.component.scss']
})
export class PaymentsMasterComponent implements OnInit {
  private KEY_ID = 'id';
  paymentObjectId: number;
  selectedDate: Date;

  constructor(private route: ActivatedRoute) {
    this.paymentObjectId = Number.parseInt(this.route.snapshot.params[this.KEY_ID], 0);
  }

  ngOnInit() {
  }

  onSelectDate(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

}