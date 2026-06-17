import {Component, input, signal} from '@angular/core';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DisplayIconElementComponent} from "../../core/components/display-icon-element/display-icon-element.component";
import {FormsModule} from "@angular/forms";

export class PaymentsTableDisplayOptions {
  private readonly keyPaymentsTableDisplayOptions = 'paymentsTableDisplayOptions';

  readonly showTooltips = signal(false);
  readonly compactProducts = signal(false);
  readonly compactTable = signal(false);
  readonly showTrend = signal(true);
  readonly showId = signal(true);
  readonly showSummary = signal(true);
  readonly displayColors = signal(true);

  public static fromLocalStorage(): PaymentsTableDisplayOptions {
    const instance = new PaymentsTableDisplayOptions();
    instance.loadFromLocalStorage();

    return instance;
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.keyPaymentsTableDisplayOptions, JSON.stringify({
      showTooltips: this.showTooltips(),
      compactProducts: this.compactProducts(),
      compactTable: this.compactTable(),
      showTrend: this.showTrend(),
      showId: this.showId(),
      showSummary: this.showSummary(),
      displayColors: this.displayColors(),
    }));
  }

  public loadDefaults(): void {
    this.showTooltips.set(false);
    this.compactProducts.set(false);
    this.compactTable.set(false);
    this.showTrend.set(true);
    this.showId.set(true);
    this.showSummary.set(true);
    this.displayColors.set(true);
  }

  public loadFromLocalStorage(): void {
    const localItem = localStorage.getItem(this.keyPaymentsTableDisplayOptions);
    if (localItem === null) {
      this.loadDefaults();
    } else {
      try {
        const localObject = JSON.parse(localItem);
        this.showTooltips.set(localObject.showTooltips);
        this.compactProducts.set(localObject.compactProducts);
        this.compactTable.set(localObject.compactTable);
        this.showTrend.set(localObject.showTrend);
        this.showId.set(localObject.showId);
        this.showSummary.set(localObject.showSummary);
        this.displayColors.set(localObject.displayColors);
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
  paymentsTableDisplayOptions = input.required<PaymentsTableDisplayOptions>();
}
