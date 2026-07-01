import {Component, inject, input, OnInit} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
import {map, tap} from 'rxjs';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDividerModule} from "@angular/material/divider";

export class ReportsTableDisplayOptions {
  private readonly KEY = 'reportsTableDisplayOptions';

  public showDate: boolean;
  public showGroup: boolean;
  public showProduct: boolean;
  public displayColors: boolean;

  public static fromLocalStorage(): ReportsTableDisplayOptions {
    const instance = new ReportsTableDisplayOptions();
    instance.loadFromLocalStorage();

    return instance;
  }

  public getColumnNumber(): number {
    return Number(this.showDate) + Number(this.showGroup) + Number(this.showProduct);
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.KEY, JSON.stringify(this));
  }

  public loadDefaults(): void {
    this.showDate = true;
    this.showGroup = true;
    this.showProduct = true;
    this.displayColors = true;
  }

  public loadFromLocalStorage(): void {
    const localItem = localStorage.getItem(this.KEY);
    this.loadDefaults();
    if (localItem !== null) {
      try {
        const localObject = JSON.parse(localItem);
        this.displayColors = localObject.displayColors;
      } catch (e) {
        this.loadDefaults();
      }
    }
  }
}


@Component({
  selector: 'app-reports-table-display-options',
  templateUrl: './reports-table-display-options.component.html',
  imports: [
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  styleUrls: ['./reports-table-display-options.component.scss']
})
export class ReportsTableDisplayOptionsComponent implements OnInit {
  private fb = inject(FormBuilder)

  reportsTableDisplayOptions = input<ReportsTableDisplayOptions>();

  displayOptionsForm = this.fb.group({
    showDate: this.fb.control<boolean | null>(null),
    showGroup: this.fb.control<boolean | null>(null),
    showProduct: this.fb.control<boolean | null>(null),
    displayColors: this.fb.control<boolean | null>(null)
  });

  // Output derived from the form: each user change mutates the bound options and re-emits.
  // The initial seed (ngOnInit) uses emitEvent:false, so it never fires here.
  selectionChanged = outputFromObservable(
    this.displayOptionsForm.valueChanges.pipe(
      tap(value => Object.assign(this.reportsTableDisplayOptions(), value)),
      map(() => this.reportsTableDisplayOptions())
    )
  );

  ngOnInit(): void {
    const options = this.reportsTableDisplayOptions();
    this.displayOptionsForm.setValue({
      showDate: options?.showDate ?? null,
      showGroup: options?.showGroup ?? null,
      showProduct: options?.showProduct ?? null,
      displayColors: options?.displayColors ?? null
    }, {emitEvent: false});
  }
}
