import { Component, OnInit } from '@angular/core';
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
  selectedDate: Date;

  constructor(private fb: FormBuilder) {
    const currentDate = new Date();
    this.dr = new DateRangeGenerator(
      new Date(currentDate.getFullYear() - 3, 0, 1),
      new Date(currentDate.getFullYear() + 1, 11, 31)
    );
    this.selectedDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  }

  ngOnInit() {
    this.editForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
      month: [this.getSelectedMonth(), Validators.required],
      year: [this.getSelectedYear(), Validators.required]
    });

    formGroup.valueChanges.subscribe((v) => {
      this.selectedDate = new Date(v.year, v.month, 1);
    });

    return formGroup;
  }

  getSelectedMonth(): number {
    return this.selectedDate.getMonth();
  }

  getSelectedYear(): number {
    return this.selectedDate.getFullYear();
  }

  addMonth(value: number): void {
    this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + value));
    this.editForm.patchValue({month: this.getSelectedMonth(), year: this.getSelectedYear()});
  }
}
