import {Component, Input, OnInit} from '@angular/core';

export class PaymentsTableDisplayOptions {
  private readonly keyPaymentsTableDisplayOptions = 'paymentsTableDisplayOptions';

  public showTooltips: boolean;
  public compactProducts: boolean;
  public compactTable: boolean;
  public showTrend: boolean;
  public showId: boolean;
  public showSummary: boolean;
  public displayColors: boolean;

  public static fromLocalStorage(): PaymentsTableDisplayOptions {
    const instance = new PaymentsTableDisplayOptions();
    instance.loadFromLocalStorage();

    return instance;
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.keyPaymentsTableDisplayOptions, JSON.stringify(this));
  }

  public loadDefaults(): void {
    this.showTooltips = false;
    this.compactProducts = false;
    this.compactTable = false;
    this.showTrend = true;
    this.showId = true;
    this.showSummary = true;
    this.displayColors = true;
  }

  public loadFromLocalStorage(): void {
    const localItem = localStorage.getItem(this.keyPaymentsTableDisplayOptions);
    if (localItem === null) {
      this.loadDefaults();
    } else {
      try {
        const localObject = JSON.parse(localItem);
        this.showTooltips = localObject.showTooltips;
        this.compactProducts = localObject.compactProducts;
        this.compactTable = localObject.compactTable;
        this.showTrend = localObject.showTrend;
        this.showId = localObject.showId;
        this.showSummary = localObject.showSummary;
        this.displayColors = localObject.displayColors;
      } catch (e) {
        this.loadDefaults();
      }
    }
  }
}

@Component({
  selector: 'app-payments-table-display-options',
  templateUrl: './payments-table-display-options.component.html',
  styleUrls: ['./payments-table-display-options.component.scss']
})
export class PaymentsTableDisplayOptionsComponent implements OnInit {

  @Input()
  public paymentsTableDisplayOptions: PaymentsTableDisplayOptions;

  constructor() { }

  ngOnInit(): void {
  }

}
