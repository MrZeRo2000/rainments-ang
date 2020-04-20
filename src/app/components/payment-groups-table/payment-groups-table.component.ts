import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentGroup} from '../../model/payment-group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {urlValidator} from '../../core/directives/url-validator.directive';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';

@Component({
  selector: 'app-payment-groups-table',
  templateUrl: './payment-groups-table.component.html',
  styleUrls: ['./payment-groups-table.component.scss']
})
export class PaymentGroupsTableComponent extends CommonSimpleEditableTableComponent<PaymentGroup> {
  @ViewChild('inputName') inputNameElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    public repository: PaymentGroupRepository,
    public dragHandlerService: DragHandlerService
  ) {
    super(PaymentObject, modalService, repository);
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        url: ['', urlValidator()]
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
    const previousPaymentGroup = this.getPaymentGroups()[event.previousIndex];
    const currentPaymentGroup = this.getPaymentGroups()[event.currentIndex];

    this.dragHandlerService.stopDrag();

    if (previousPaymentGroup && currentPaymentGroup && previousPaymentGroup.id !== currentPaymentGroup.id) {
      this.repository.moveItem(previousPaymentGroup.id, currentPaymentGroup.id);
    }
  }
}
