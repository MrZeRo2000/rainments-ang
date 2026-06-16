import {Component, computed, inject, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {PaymentObjectGroupRefs} from '../../model/payment-object-group-refs';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MessagesService} from '../../messages/messages.service';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {Subject, Subscription} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../../core/components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { HttpParams } from '@angular/common/http';
import {UpdatePaymentObjectGroupRepository} from '../../repository/update-payment-object-group-repository';
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
export class UpdatePaymentGroupComponent extends CommonTableComponent<PaymentObjectGroupRefs> implements OnInit, OnDestroy {
  private fb = inject(FormBuilder)
  private modalService = inject(BsModalService)
  public messagesService = inject(MessagesService)
  private updateRepository = inject(UpdatePaymentObjectGroupRepository)

  @Input()
  messageSource: string;

  bsModalRef: BsModalRef;
  formSubmitted = false;

  private updateSubscription: Subscription;
  private loadingSubscription: Subscription;

  // Update side is still observable-based (left for a future migration); mirror
  // its loading into a signal so it composes with the read repository's signal.
  private updateLoadingSignal = signal(false);
  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.updateLoadingSignal());

  editForm = this.fb.group({
    paymentObject: ['', Validators.required],
    paymentGroupFrom: ['', Validators.required],
    paymentGroupTo: ['', [Validators.required, distinctFromSiblingValidator('paymentGroupFrom', 'equalsFrom')]]
  });

  constructor() {
    super(inject(PAYMENT_OBJECT_GROUP_REFS_READ_REPOSITORY));
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.updateRepository.setDefaultPersistParams({messageSource: this.messageSource});

    this.loadingSubscription = this.updateRepository.getLoadingState().subscribe(value => {
      this.updateLoadingSignal.set(value);
    });
    this.updateSubscription = this.updateRepository.getPersistData().subscribe(data => {
      this.messagesService.reportMessage(new SuccessMessage(`Successfully updated ${data.body.rowsAffected} rows`, this.messageSource));
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  // Enable scoped reporting of refs-load errors (updateMessages gates the
  // ReadRepository's error message; messageSource routes it to this panel).
  protected override loadRepositoryData(): void {
    this.readRepository.loadData({updateMessages: true, messageSource: this.messageSource});
  }

  importClick() {
    this.formSubmitted = true;
    // paymentGroupTo's cross-field validator is stale if paymentGroupFrom changed last.
    this.editForm.controls.paymentGroupTo.updateValueAndValidity();

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
      .append('paymentObjectId', this.editForm.controls.paymentObject.value ?? '')
      .append('paymentGroupFromId', this.editForm.controls.paymentGroupFrom.value ?? '')
      .append('paymentGroupToId', this.editForm.controls.paymentGroupTo.value ?? '');
  }
}
