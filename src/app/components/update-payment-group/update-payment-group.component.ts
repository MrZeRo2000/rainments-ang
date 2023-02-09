import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PaymentObjectGroupRefs} from '../../model/payment-object-group-refs';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MessagesService} from '../../messages/messages.service';
import {PaymentObjectGroupRefsRepository} from '../../repository/payment-object-group-refs-repository';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {Subject, Subscription} from 'rxjs';
import {PaymentObject} from '../../model/payment-object';
import {PaymentGroup} from '../../model/payment-group';
import {ConfirmationModalDialogComponent} from '../../core/components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpParams} from '@angular/common/http';
import {UpdatePaymentObjectGroupRepository} from '../../repository/update-payment-object-group-repository';
import {Loadable} from '../../core/edit/edit-intf';
import {SuccessMessage} from '../../messages/message.model';

@Component({
  selector: 'app-update-payment-group',
  templateUrl: './update-payment-group.component.html',
  styleUrls: ['./update-payment-group.component.scss']
})
export class UpdatePaymentGroupComponent extends CommonTableComponent<PaymentObjectGroupRefs> implements OnInit, OnDestroy, Loadable {

  @Input()
  messageSource: string;

  bsModalRef: BsModalRef;

  editForm: UntypedFormGroup;
  formSubmitted = false;

  private updateSubscription: Subscription;
  private loadingSubscription: Subscription;

  private updateLoading = false;

  getLoading() {
    return this.repository.getLoading() || this.updateLoading;
  }

  constructor(
    private fb: UntypedFormBuilder,
    public messagesService: MessagesService,
    public repository: PaymentObjectGroupRefsRepository,
    private updateRepository: UpdatePaymentObjectGroupRepository,
    private modalService: BsModalService,
    ) {
    super(repository);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.editForm = this.buildForm();

    this.repository.setDefaultLoadParams({messageSource: this.messageSource});
    this.updateRepository.setDefaultPersistParams({messageSource: this.messageSource});

    this.loadingSubscription = this.updateRepository.getLoadingState().subscribe(value => {
      this.updateLoading = value;
    });
    this.updateSubscription = this.updateRepository.getPersistData().subscribe(data => {
      this.messagesService.reportMessage(new SuccessMessage(`Successfully updated ${data.body.rowsAffected} rows`, this.messageSource));
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.loadingSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  private buildForm(): UntypedFormGroup {
    return this.fb.group({
        paymentObject: ['', Validators.required],
        paymentGroupFrom: ['', Validators.required],
        paymentGroupTo: ['', Validators.required]
      }
    );
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData().length > 0 && this.repository.getData()[0].paymentObjectList;
  }

  getPaymentGroups(): PaymentGroup[] {
    return this.repository.getData().length > 0 && this.repository.getData()[0].paymentGroupList;
  }

  importClick() {
    this.formSubmitted = true;

    if (this.editForm.valid) {
      if (this.editForm.controls.paymentGroupFrom.value === this.editForm.controls.paymentGroupTo.value) {
        this.editForm.controls.paymentGroupTo.setErrors({equalsFrom: true});
      }
    }

    if (this.editForm.valid) {
      const resultSubject: Subject<null> = new Subject<null>();
      resultSubject.subscribe(() => {
        this.updateRepository.postFormData(this.getParamsFromEditForm());
      });
      const message = '<strong>This operation can not be undone.</strong> <BR>Are you sure?';
      const initialState  = {message, result: resultSubject};
      this.bsModalRef = this.modalService.show(ConfirmationModalDialogComponent, {initialState});
    }
  }

  private getParamsFromEditForm(): HttpParams {
    return new HttpParams()
      .append('paymentObjectId', this.editForm.controls.paymentObject.value)
      .append('paymentGroupFromId', this.editForm.controls.paymentGroupFrom.value)
      .append('paymentGroupToId', this.editForm.controls.paymentGroupTo.value);
  }
}
