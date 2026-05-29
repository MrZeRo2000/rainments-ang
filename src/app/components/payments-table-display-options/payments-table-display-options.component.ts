import {Component, Input} from '@angular/core';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DisplayIconElementComponent} from "../../core/components/display-icon-element/display-icon-element.component";
import {FormsModule} from "@angular/forms";

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
  imports: [
    BsDropdownModule,
    DisplayIconElementComponent,
    FormsModule
  ],
  styleUrls: ['./payments-table-display-options.component.scss']
})
export class PaymentsTableDisplayOptionsComponent {
  @Input()
  public paymentsTableDisplayOptions: PaymentsTableDisplayOptions;

}
