import {Component, computed, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {PaymentObjectGroupRefs} from '../../model/payment-object-group-refs';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MessagesService} from '../../messages/messages.service';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {Subject, tap} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../../core/components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { HttpParams } from '@angular/common/http';
import {UpdatePaymentObjectGroupRepository} from '../../repository/update-payment-object-group-repository';
import {CrudStatus} from '../../core/repository/crud-repository';
import {SuccessMessage} from '../../messages/message.model';
import {NgClass} from "@angular/common";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {distinctFromSiblingValidator} from '../../core/validators/form-validators';
import {PAYMENT_OBJECT_GROUP_REFS_READ_REPOSITORY} from '../../repository/repository-tokens';

@Component({
  selector: 'app-update-payment-group',
  templateUrl: './update-payment-group.component.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    LoadingProgressComponent
  ],
  styleUrls: ['./update-payment-group.component.scss']
})
export class UpdatePaymentGroupComponent extends CommonTableComponent<PaymentObjectGroupRefs> {
  private fb = inject(FormBuilder)
  private modalService = inject(BsModalService)
  private messagesService = inject(MessagesService)
  private updateRepository = inject(UpdatePaymentObjectGroupRepository)

  messageSource = input<string>();

  bsModalRef: BsModalRef;
  formSubmitted = false;

  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.updateRepository.loadingSignal());

  editForm = this.fb.group({
    paymentObject: ['', Validators.required],
    paymentGroupFrom: ['', Validators.required],
    paymentGroupTo: ['', [Validators.required, distinctFromSiblingValidator('paymentGroupFrom', 'equalsFrom')]]
  });

  // Activates the CRUD stream and reports the success message; the repository
  // reports its own (scoped) errors.
  private updateResult = toSignal(this.updateRepository.crudAction$.pipe(
    tap(result => {
      if (result.status === CrudStatus.Success) {
        this.messagesService.reportMessage(
          new SuccessMessage(`Successfully updated ${result.data?.rowsAffected ?? 0} rows`, this.messageSource()));
      }
    })
  ));

  constructor() {
    super(inject(PAYMENT_OBJECT_GROUP_REFS_READ_REPOSITORY));
  }

  // Enable scoped reporting of refs-load errors (updateMessages gates the
  // ReadRepository's error message; messageSource routes it to this panel).
  protected override loadRepositoryData(): void {
    this.readRepository.loadData({updateMessages: true, messageSource: this.messageSource()});
  }

  importClick() {
    this.formSubmitted = true;
    // paymentGroupTo's cross-field validator is stale if paymentGroupFrom changed last.
    this.editForm.controls.paymentGroupTo.updateValueAndValidity();

    if (this.editForm.valid) {
      // Scope this operation's error messages to this component's panel.
      this.updateRepository.setDefaultPersistParams({messageSource: this.messageSource()});

      const resultSubject: Subject<null> = new Subject<null>();
      resultSubject.subscribe(() => {
        this.updateRepository.postFormData(new HttpParams()
          .append('paymentObjectId', this.editForm.controls.paymentObject.value ?? '')
          .append('paymentGroupFromId', this.editForm.controls.paymentGroupFrom.value ?? '')
          .append('paymentGroupToId', this.editForm.controls.paymentGroupTo.value ?? ''));
      });
      const message = '<strong>This operation can not be undone.</strong> <BR>Are you sure?';
      const initialState  = {message, result: resultSubject};
      this.bsModalRef = this.modalService.show(ConfirmationModalDialogComponent, {initialState});
    }
  }
}
