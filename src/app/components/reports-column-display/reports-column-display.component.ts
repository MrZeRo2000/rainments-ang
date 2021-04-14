import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reports-column-display',
  templateUrl: './reports-column-display.component.html',
  styleUrls: ['./reports-column-display.component.scss']
})
export class ReportsColumnDisplayComponent implements OnInit {

  @Output()
  selectionChanged = new EventEmitter<Array<string>>();

  columnDisplayForm: FormGroup;

  private buildForm(): FormGroup {
    const formGroup = this.fb.group({
        periodDate: [true],
        paymentGroup: [true],
        product: [true]
      }
    );

    formGroup.valueChanges.subscribe((value => {
      this.selectionChanged.emit(Object.keys(value).filter( v => value[v]));
    }))

    return formGroup;
 }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.columnDisplayForm = this.buildForm();
  }

}
