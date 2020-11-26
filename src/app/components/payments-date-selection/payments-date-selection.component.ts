import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateRangeGenerator, PeriodInfo} from '../../core/utils/date-range-generator';
import {DateGenerator} from '../../core/utils/date-generator';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectTotals} from '../../model/payment-object-totals';

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit {
  editForm: FormGroup;
  periods: Array<PeriodInfo>;
  years: Array<number>;
  period: string;

  minSelectionDate: Date;
  maxSelectionDate: Date;

  lastSelectedDate: Date;

  dr: DateRangeGenerator;

  @Input() paymentObjectTotals: PaymentObjectTotals;

  @Output() selectedDate = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    // this.lastSelectedDate = DateGenerator.getPreviousMonthStartDate();
    this.selectedDate.subscribe(v => {
      this.lastSelectedDate = v;
      console.log('Selected ' + JSON.stringify(v));
      }
    );

    const currentDate = new Date();
    this.minSelectionDate = new Date(currentDate.getFullYear() - 3, 0, 1);
    this.maxSelectionDate = new Date(currentDate.getFullYear() + 1, 11, 31);

    this.editForm = this.buildForm();
  }

  ngOnInit() {
    this.lastSelectedDate = (this.paymentObjectTotals && this.paymentObjectTotals.paymentDate) || new Date();
    this.setPeriod((this.paymentObjectTotals && this.paymentObjectTotals.paymentObject.period) || 'M');
    this.selectedDate.emit(this.lastSelectedDate);
  }

  /*
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes[propName].isFirstChange()) {
        const changedProp = changes[propName];
        console.log(`Payments Date Selection propName=${propName}, propValue=${JSON.stringify(changedProp.currentValue)}`)
        if (propName === 'paymentObject' && changedProp.currentValue) {
          if (changedProp.currentValue.hasOwnProperty('period')) {
            this.setPeriod(changedProp.currentValue.period)
          } else {
            this.setPeriod('M');
          }
        }
      }
    }
  }
   */

  private setPeriod(period: string) {
    if (period && this.period !== period) {
      console.log(`Payments Date Selection setting period to ${period}`)
      this.dr = new DateRangeGenerator(
        this.minSelectionDate, this.maxSelectionDate, period
      );

      this.periods = this.dr.getPeriods();
      this.years = this.dr.getYears();

      // this.editForm.patchValue({monthSelect: 0})
      this.editForm.controls.yearSelect.setValue(this.lastSelectedDate.getFullYear());
      this.editForm.controls.periodSelect.setValue(this.dr.getPeriodValue(this.lastSelectedDate));
      this.period = period;
    }
  }

  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
      periodSelect: ['', Validators.required],
      yearSelect: ['', Validators.required]
    });

    formGroup.valueChanges.subscribe((v) => {
      if (this.period) {
        const periodDate = this.dr.getPeriodDate(v.yearSelect, v.periodSelect);
        console.log(`Emitting date: ${JSON.stringify(periodDate)}`)
        this.selectedDate.emit(periodDate);
      }
    });

    return formGroup;
  }

  getSelectedMonth(): number {
    return this.lastSelectedDate.getMonth();
  }

  getSelectedYear(): number {
    return this.lastSelectedDate.getFullYear();
  }

  addPeriod(value: number): void {
    if ((value > 0 && !this.selectedLastDate()) || (value < 0 && !this.selectedFirstDate())) {
      // const newDate = new Date(this.lastSelectedDate.setMonth(this.lastSelectedDate.getMonth() + value));
      const newDate = this.dr.addPeriod(this.lastSelectedDate, value);
      this.selectedDate.emit(newDate);
      this.editForm.patchValue({periodSelect: this.dr.getPeriodValue(newDate), yearSelect: newDate.getFullYear()});
    }
  }

  selectedFirstDate(): boolean {
    return this.dr.addPeriod(this.lastSelectedDate, -1) < this.minSelectionDate;
  }

  selectedLastDate(): boolean {
    return this.dr.addPeriod(this.lastSelectedDate, 1) > this.maxSelectionDate;
  }

}
