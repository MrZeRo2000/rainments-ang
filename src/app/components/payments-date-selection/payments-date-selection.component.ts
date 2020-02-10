import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payments-date-selection',
  templateUrl: './payments-date-selection.component.html',
  styleUrls: ['./payments-date-selection.component.scss']
})
export class PaymentsDateSelectionComponent implements OnInit {
  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      month: ['2', Validators.required]
    });
  }
}
