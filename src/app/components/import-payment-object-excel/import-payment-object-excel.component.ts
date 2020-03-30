import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonSimpleTableComponent} from '../../core/table/common-simple-table-component';
import {PaymentObject} from '../../model/payment-object';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImportPaymentObjectRepository} from '../../repository/import-payment-object-repository';
import {MessagesService} from '../../messages/messages.service';
import {SuccessMessage} from '../../messages/message.model';
import {Loadable} from '../../core/edit/edit-intf';
import {LoadingModalPanelComponent} from '../../core/components/loading-modal-panel/loading-modal-panel.component';
import {LoadingModalService} from '../../core/services/loading-modal.service';

@Component({
  selector: 'app-import-payment-object-excel',
  templateUrl: './import-payment-object-excel.component.html',
  styleUrls: ['./import-payment-object-excel.component.scss']
})
export class ImportPaymentObjectExcelComponent extends CommonSimpleTableComponent<PaymentObject> implements OnInit, Loadable {
  private readonly messageSource = 'importPaymentObject';

  editForm: FormGroup;
  formSubmitted = false;
  editFormFile: File;

  @ViewChild('importFile') importFileElement: ElementRef;

  getLoading(): boolean {
    return this.repository.getLoading();
  }

  constructor(
    private fb: FormBuilder,
    public messagesService: MessagesService,
    public repository: PaymentObjectRepository,
    private importRepository: ImportPaymentObjectRepository,
    private loadingModalService: LoadingModalService) {
      super(repository);
  }

  ngOnInit(): void {
    this.editForm = this.buildForm();

    this.repository.setDefaultLoadParams({messageSource: this.messageSource});
    this.importRepository.setDefaultPersistParams({messageSource: this.messageSource});

    this.importRepository.getPersistData().subscribe(data =>
      this.messagesService.reportMessage(new SuccessMessage(`Successfully imported ${data.body.rowsAffected} rows`, this.messageSource)));
    this.importRepository.getLoadingState().subscribe(value => {
      if (!value) {
        setTimeout(() => this.loadingModalService.hide(), 100);
      }
    });
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

  selectFileButtonClick(event: any): void {
    event.preventDefault();
    this.importFileElement.nativeElement.click();
  }

  onImport(): void {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      const paymentObject = this.getPaymentObjects().filter(value =>
        value.id === Number.parseInt(this.editForm.value.paymentObject, 0))[0];

      const formData = new FormData();
      formData.append('payment_object', new Blob([JSON.stringify(paymentObject)], {type: 'application/json'}));
      formData.append('file', this.editFormFile);

      this.loadingModalService.show();

      setTimeout(() => this.importRepository.postFormData(formData), 100);
    }
  }

  onClear(): void {
    this.messagesService.resetMessage();
    this.editForm.reset();
    this.importFileElement.nativeElement.value = '';
    this.editFormFile = null;
    this.formSubmitted = false;
  }

}
