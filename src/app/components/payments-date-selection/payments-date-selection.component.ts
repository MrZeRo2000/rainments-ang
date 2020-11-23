import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateRangeGenerator, PeriodInfo} from '../../core/utils/date-range-generator';
import {DateGenerator} from '../../core/utils/date-generator';
import {PaymentObject} from '../../model/payment-object';

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit, OnChanges {
  editForm: FormGroup;
  months: Array<PeriodInfo>;
  years: Array<number>;

  minSelectionDate: Date;
  maxSelectionDate: Date;

  lastSelectedDate: Date;

  @Input() paymentObject: PaymentObject;

  @Output() selectedDate = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    this.lastSelectedDate = DateGenerator.getPreviousMonthStartDate();
    this.selectedDate.subscribe(v => {
      this.lastSelectedDate = v;
      console.log('Selected ' + JSON.stringify(v));
      }
    );

    this.minSelectionDate = new Date(this.lastSelectedDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(this.lastSelectedDate.getFullYear() + 1, 11, 31);

    const dr = new DateRangeGenerator(
      this.minSelectionDate, this.maxSelectionDate
    );

    this.months = dr.getMonths();
    this.years = dr.getYears();

    this.editForm = this.buildForm();
  }

  ngOnInit() {
    this.selectedDate.emit(this.lastSelectedDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const changedProp = changes[propName];
        console.log(`Payments Date Selection propName=${propName}, propValue=${JSON.stringify(changedProp.currentValue)}`)
      }
    }
  }


  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
      monthSelect: [this.getSelectedMonth(), Validators.required],
      yearSelect: [this.getSelectedYear(), Validators.required]
    });

    formGroup.valueChanges.subscribe((v) => {
      this.selectedDate.emit(new Date(v.yearSelect, v.monthSelect, 1));
    });

    return formGroup;
  }

  getSelectedMonth(): number {
    return this.lastSelectedDate.getMonth();
  }

  getSelectedYear(): number {
    return this.lastSelectedDate.getFullYear();
  }

  addMonth(value: number): void {
    if ((value > 0 && !this.selectedLastDate()) || (value < 0 && !this.selectedFirstDate())) {
      const newDate = new Date(this.lastSelectedDate.setMonth(this.lastSelectedDate.getMonth() + value));
      this.selectedDate.emit(newDate);
      this.editForm.patchValue({monthSelect: this.getSelectedMonth(), yearSelect: this.getSelectedYear()});
    }
  }

  selectedFirstDate(): boolean {
    return this.lastSelectedDate.getFullYear() === this.minSelectionDate.getFullYear() &&
      this.lastSelectedDate.getMonth() === this.minSelectionDate.getMonth();
  }

  selectedLastDate(): boolean {
    return this.lastSelectedDate.getFullYear() === this.maxSelectionDate.getFullYear() &&
      this.lastSelectedDate.getMonth() === this.maxSelectionDate.getMonth();
  }

}
