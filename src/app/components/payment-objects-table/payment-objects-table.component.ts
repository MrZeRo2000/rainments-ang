import {Component, OnInit} from '@angular/core';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';
import {EditMode, EditState} from '../../model/edit-state';
import {AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  styleUrls: ['./payment-objects-table.component.css']
})
export class PaymentObjectsTableComponent implements OnInit {
  editState: EditState<PaymentObject>;
  editForm = this.fb.group({
      name: ['', Validators.required]
    }
  );

  nameUnique(): ValidatorFn {
    return (control: AbstractControl):
      {[key: string]: any}  | null  => {
      return {existingName: {value: control.value}};
    };
  }

  constructor(private fb: FormBuilder, private repository: PaymentObjectRepository) { }

  ngOnInit() {
    this.repository.loadData();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  onAddClick(): void {
    this.editState = new EditState<PaymentObject>(EditMode.EM_CREATE, new PaymentObject());
  }

  onDeleteClick(item: PaymentObject): void {
    alert('OnDelete:' + item.id);
  }

  onEditClick(item: PaymentObject): void {
    alert('OnEdit:' + item.id);
    this.editState = new EditState<PaymentObject>(EditMode.EM_CREATE, item);
  }

  onSubmit(): void {
    this.editState.submitted = true;
    const nameDuplicates = this.repository.getData().filter((v) => v.name === this.editForm.controls.name.value);
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    if (this.editForm.valid) {
      this.editState.editItem = Object.assign({}, this.editForm.value);
      alert('on submit:' + JSON.stringify(this.editForm.value) + ', item:' + this.editState.editItem.name);
    }
  }

  onCancel(): void {
    this.editState = undefined;
  }

}
