import {Component, ElementRef, ViewChild} from '@angular/core';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {TimePeriod, TimePeriodType} from '../../core/utils/time-period';

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  styleUrls: ['./payment-objects-table.component.scss']
})
export class PaymentObjectsTableComponent extends CommonSimpleEditableTableComponent<PaymentObject> {
  @ViewChild('inputName') inputNameElement: ElementRef;

  periodTypes = [[], [TimePeriodType.M, 'Month'], [TimePeriodType.Q, 'Quarter']];
  termTypes = [[], [TimePeriodType.D, 'Day'], [TimePeriodType.M, 'Month']];
  termQuantities = [...Array(31)].map((c, i) => i === 0 ? undefined : i.toString(10))
  payDelays = [[], [0, 'Current Period'], [1, 'Next Period']]

  constructor(
    private fb: UntypedFormBuilder,
    protected modalService: BsModalService,
    public repository: PaymentObjectRepository,
    public dragHandlerService: DragHandlerService
  ) {
    super(PaymentObject, modalService, repository);
  }

  protected buildForm(): UntypedFormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        period: [''],
        termQuantity: [''],
        termType: [''],
        payDelay: ['']
      }
    );
  }

  protected editFormChanged(data: any) {
    super.editFormChanged(data);
    this.editForm.controls.termType.setErrors(null);
    this.editForm.controls.termQuantity.setErrors(null);
    this.editForm.controls.payDelay.setErrors(null);
  }

  protected getEditValue(item: any): any {
    const value = super.getEditValue(item);

    const termPeriod = TimePeriod.fromString(value.term);
    delete value.term;

    if (termPeriod) {
      value.termType = termPeriod.periodType;
      value.termQuantity = termPeriod.quantity;
    }

    return value;
  }

  protected  getDisplayItemName(item: PaymentObject): string {
    return item.name;
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  protected setEditFocus(): void {
    this.inputNameElement.nativeElement.focus();
  }

  private validateTerm(): void {
    if (this.editForm.controls.period.value === '') {
      if (this.editForm.controls.termType.value !== '') {
        this.editForm.controls.termType.setErrors({termNoPeriod: true});
      }

      if (this.editForm.controls.termQuantity.value !== '') {
        this.editForm.controls.termQuantity.setErrors({termQuantityNoPeriod: true});
      }

      if (this.editForm.controls.payDelay.value !== '') {
        this.editForm.controls.payDelay.setErrors({delayNoPeriod: true});
      }

    } else {
      if (this.editForm.controls.termQuantity.value !== '' && this.editForm.controls.termType.value === '') {
        this.editForm.controls.termQuantity.setErrors({termQuantityNoType: true});
      }
    }
  }

  protected validateCreate(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    this.validateTerm();
  }

  protected validateSave(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value && v.id !== this.editState.editItem.id
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    this.validateTerm();
  }

  protected getWritableData(): PaymentObject {
    const o: any = super.getWritableData();

    const termPeriod = new TimePeriod(o.termType, o.termQuantity);

    delete o.termQuantity;
    delete o.termPeriod;

    if (termPeriod && termPeriod.toString()) {
      o.term = termPeriod.toString();
    }

    return o;
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
