import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateRangeGenerator, MonthInfo} from '../../core/utils/date-range-generator';

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit {
  editForm: FormGroup;
  months: Array<MonthInfo>;
  years: Array<number>;
  lastSelectedDate: Date;

  @Output() selectedDate = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    const currentDate = new Date();
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.lastSelectedDate = new Date(lastDate.setMonth(lastDate.getMonth() - 1));
    this.selectedDate.subscribe((v) => this.lastSelectedDate = v);

    const dr = new DateRangeGenerator(
      new Date(this.lastSelectedDate.getFullYear() - 3, 0, 1),
      new Date(this.lastSelectedDate.getFullYear() + 1, 11, 31)
    );

    this.months = dr.getMonths();
    this.years = dr.getYears();

    this.editForm = this.buildForm();
  }

  ngOnInit() {
    this.selectedDate.emit(this.lastSelectedDate);
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
    this.selectedDate.emit(new Date(this.lastSelectedDate.setMonth(this.lastSelectedDate.getMonth() + value)));
    this.editForm.patchValue({monthSelect: this.getSelectedMonth(), yearSelect: this.getSelectedYear()});
  }
}
