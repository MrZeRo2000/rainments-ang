import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';
import {EditMode, EditState} from '../../model/edit-state';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {DialogConfirmationComponent} from '../dialog-confirmation/dialog-confirmation.component';
import {Subject} from 'rxjs';
import {Editable} from '../../core/edit-intf';

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  styleUrls: ['./payment-objects-table.component.css']
})
export class PaymentObjectsTableComponent implements OnInit, Editable  {
  bsModalRef: BsModalRef;
  EditMode = EditMode;
  editState: EditState<PaymentObject>;
  editForm: FormGroup;
  @ViewChild('inputName', {static: false}) inputNameElement: ElementRef;

  buildForm(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required]
      }
    );
  }

  nameUnique(): ValidatorFn {
    return (control: AbstractControl):
      {[key: string]: any}  | null  => {
      return {existingName: {value: control.value}};
    };
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService, private repository: PaymentObjectRepository) { }

  ngOnInit() {
    this.repository.loadData();
    this.repository.getPersistSuccessObservable().subscribe((value) => {
      if (value) {
        this.editState = undefined;
        this.repository.loadData();
      }
    });
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  private requireFocus(): void {
    setTimeout(() => this.setEditFocus());
  }

  private setEditFocus(): void {
    this.inputNameElement.nativeElement.focus();
  }

  onAddClick(): void {
    this.editForm = this.buildForm();
    this.editState = new EditState<PaymentObject>(EditMode.EM_CREATE, new PaymentObject());
    this.requireFocus();
  }

  onDeleteClick(item: PaymentObject): void {
    const resultSubject: Subject<PaymentObject> = new Subject<PaymentObject>();
    resultSubject.subscribe((result) => {
      this.repository.deleteItem(result.id);
    });
    const message = '<strong>' + item.name + '</strong> will be deleted. <BR>Are you sure?';
    const initialState  = {message, item, result: resultSubject};
    this.bsModalRef = this.modalService.show(DialogConfirmationComponent, {initialState});
  }

  onEditClick(item: PaymentObject): void {
    this.editState = new EditState<PaymentObject>(EditMode.EM_EDIT, item);
    this.editForm = this.buildForm();
    this.editForm.patchValue(Object.assign({}, item));
    this.requireFocus();
  }

  onCreate(): void {
    this.editState.submitted = true;
    const nameDuplicates = this.repository.getData().filter((v) => v.name === this.editForm.controls.name.value);
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    if (this.editForm.valid) {
      this.repository.postItem(Object.assign({}, this.editForm.value));
    }
  }

  onSave(): void {
    this.editState.submitted = true;
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value && v.id !== this.editState.editItem.id
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    if (this.editForm.valid) {
      this.repository.putItem(this.editState.editItem.id, Object.assign({}, this.editForm.value));
    }
  }

  onCancel(): void {
    this.editState = undefined;
  }

  getEditingState(): boolean {
    return this.repository.getDataAvailable() && !this.editState;
  }

  getEditState(): EditState<PaymentObject> {
    return this.editState;
  }
}
