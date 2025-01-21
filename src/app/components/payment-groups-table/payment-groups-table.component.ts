import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentGroup} from '../../model/payment-group';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {urlValidator} from '../../core/directives/url-validator.directive';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';

@Component({
    selector: 'app-payment-groups-table',
    templateUrl: './payment-groups-table.component.html',
    styleUrls: ['./payment-groups-table.component.scss'],
    standalone: false
})
export class PaymentGroupsTableComponent extends CommonSimpleEditableTableComponent<PaymentGroup> {
  @ViewChild('inputName') inputNameElement: ElementRef;

  preview: boolean = false;

  getPreviewColor(): string {
    return this.preview ? this.editForm.controls.color.value : '#FFFFFF';
  }

  constructor(
    private fb: UntypedFormBuilder,
    protected modalService: BsModalService,
    public repository: PaymentGroupRepository,
    public dragHandlerService: DragHandlerService
  ) {
    super(PaymentObject, modalService, repository);
  }

  protected buildForm(): UntypedFormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        url: ['', urlValidator()],
        color: ['#FFFFFF']
      }
    );
  }

  protected getDisplayItemName(item: PaymentGroup): string {
    return item.name;
  }

  getPaymentGroups(): PaymentGroup[] {
    return this.repository.getData();
  }

  protected setEditFocus(): void {
    this.inputNameElement.nativeElement.focus();
  }

  protected validateCreate(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
  }

  protected validateSave(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value && v.id !== this.editState.editItem.id
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }

  protected getWritableData(): PaymentGroup {
    const data = super.getWritableData();
    if (data.color.toUpperCase() === "#FFFFFF") {
      data.color = null;
    }
    return data;
  }
}
