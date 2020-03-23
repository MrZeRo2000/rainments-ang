import { Component, OnInit } from '@angular/core';
import {CommonSimpleTableComponent} from '../../core/table/common-simple-table-component';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImportPaymentObjectRepository} from '../../repository/import-payment-object-repository';

@Component({
  selector: 'app-import-payment-object-excel',
  templateUrl: './import-payment-object-excel.component.html',
  styleUrls: ['./import-payment-object-excel.component.scss']
})
export class ImportPaymentObjectExcelComponent extends CommonSimpleTableComponent<PaymentObject> implements OnInit {
  editForm: FormGroup;
  formSubmitted = false;
  editFormFile: File;

  constructor(
    private fb: FormBuilder,
    public repository: PaymentObjectRepository,
    private importRepository: ImportPaymentObjectRepository) {
      super(repository);
  }

  ngOnInit(): void {
    this.editForm = this.buildForm();
    this.importRepository.getPersistSuccessObservable().subscribe(value => {});
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
        paymentObject: ['', Validators.required],
        fileName: ['', Validators.required]
      }
    );
  }

  uploadFile(event: any): void {
    this.editFormFile = event.target.files[0];
    this.editForm.controls.fileName.setValue(this.editFormFile.name);
  }

  importFileButtonClick(event: any): void {
    event.preventDefault();
    document.getElementById('importFile').click();
  }

  onImport(): void {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      alert('uploading');
      const paymentObject = this.getPaymentObjects().filter(value => value.id === Number.parseInt(this.editForm.value.paymentObject,0))[0];

      const formData = new FormData();
      formData.append('payment_object', JSON.stringify(paymentObject));
      formData.append('file', this.editFormFile);
      this.importRepository.postFormData(formData);
    }
  }

  onClear(): void {
    this.editForm.reset();
    this.editFormFile = null;
    this.formSubmitted = false;
  }
}
