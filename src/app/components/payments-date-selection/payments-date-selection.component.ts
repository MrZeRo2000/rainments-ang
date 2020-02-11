import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateRangeGenerator} from '../../core/date-range-generator';

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit {
  editForm: FormGroup;
  dr: DateRangeGenerator;
  lastSelectedDate: Date;

  @Output() selectedDate = new EventEmitter<Date>();

  constructor(private fb: FormBuilder) {
    const currentDate = new Date();
    this.lastSelectedDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    this.selectedDate.subscribe((v) => this.lastSelectedDate = v);

    this.dr = new DateRangeGenerator(
      new Date(this.lastSelectedDate.getFullYear() - 3, 0, 1),
      new Date(this.lastSelectedDate.getFullYear() + 1, 11, 31)
    );
  }

  ngOnInit() {
    this.selectedDate.emit(this.lastSelectedDate);
    this.editForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
      month: [this.getSelectedMonth(), Validators.required],
      year: [this.getSelectedYear(), Validators.required]
    });

    formGroup.valueChanges.subscribe((v) => {
      this.selectedDate.emit(new Date(v.year, v.month, 1));
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
    this.editForm.patchValue({month: this.getSelectedMonth(), year: this.getSelectedYear()});
  }
}
