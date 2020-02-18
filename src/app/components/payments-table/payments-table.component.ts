import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {reduce} from 'rxjs/operators';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent implements OnInit, OnChanges {

  @Input()
  paymentObjectId: number;

  @Input()
  paymentPeriodDate: Date;

  constructor() { }

  ngOnInit() {
    this.checkInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes[propName].isFirstChange()) {
        return;
      }
    }

    this.checkInput();
  }

  private checkInput() {
    if (this.paymentObjectId && this.paymentPeriodDate) {
      console.log('Ready to load paymentObjectId=' + this.paymentObjectId + ', date=' + this.paymentPeriodDate);
    }
  }

}
