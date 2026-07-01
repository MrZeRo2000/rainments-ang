import {Component, input} from '@angular/core';
import {Payment} from '../../model/payment';
import {ReportsTableDisplayOptions} from '../reports-table-display-options/reports-table-display-options.component';
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {DatePipe} from "@angular/common";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  imports: [
    AmountPipe,
    DatePipe,
    MatTableModule
  ],
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {

  payments = input<Array<Payment>>();

  displayOptions = input<ReportsTableDisplayOptions>();

  // The display options object is mutated in place by the parent (same reference),
  // so a computed off the input signal wouldn't react. Derive the columns via a
  // method memoized on the toggle values: it returns a stable array reference
  // (no mat-table churn) until Date/Group/Product visibility actually changes.
  private columnsCache: string[] = [];
  private columnsKey = '';

  displayedColumns(): string[] {
    const options = this.displayOptions();
    const key = `${options?.showDate}|${options?.showGroup}|${options?.showProduct}`;
    if (key !== this.columnsKey) {
      this.columnsKey = key;
      const columns: string[] = [];
      if (options?.showDate) { columns.push('date'); }
      if (options?.showGroup) { columns.push('group'); }
      if (options?.showProduct) { columns.push('product'); }
      columns.push('payment', 'commission');
      this.columnsCache = columns;
    }
    return this.columnsCache;
  }
}
