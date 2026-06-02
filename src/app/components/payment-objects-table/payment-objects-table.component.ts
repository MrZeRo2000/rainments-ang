import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BaseCommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {TimePeriod, TimePeriodType} from '../../core/utils/time-period';
import {AddPanelComponent} from "../../core/components/add-panel/add-panel.component";
import {DropDownMoreMenuComponent} from "../../core/components/drop-down-more-menu/drop-down-more-menu.component";
import {NgClass} from "@angular/common";
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";
import {DragGripComponent} from "../../core/components/drag-grip/drag-grip.component";
import {EditDeletePanelComponent} from "../../core/components/edit-delete-panel/edit-delete-panel.component";
import {SaveDialogPanelComponent} from "../../core/components/save-dialog-panel/save-dialog-panel.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  imports: [
    AddPanelComponent,
    DropDownMoreMenuComponent,
    NgClass,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    DragGripComponent,
    CdkDragHandle,
    EditDeletePanelComponent,
    ReactiveFormsModule,
    SaveDialogPanelComponent,
    LoadingProgressComponent
  ],
  styleUrls: ['./payment-objects-table.component.scss']
})
export class PaymentObjectsTableComponent extends BaseCommonSimpleEditableTableComponent<PaymentObject> {
  private fb = inject(UntypedFormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  @ViewChild('inputName') inputNameElement: ElementRef;

  periodTypes = [[], [TimePeriodType.M, 'Month'], [TimePeriodType.Q, 'Quarter']];
  termTypes = [[], [TimePeriodType.D, 'Day'], [TimePeriodType.M, 'Month']];
  termQuantities = [...Array(31)].map((c, i) => i === 0 ? undefined : i.toString(10))
  payDelays = [[], [0, 'Current Period'], [1, 'Next Period']]

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    protected modalService: BsModalService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public repository: PaymentObjectRepository) {
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
