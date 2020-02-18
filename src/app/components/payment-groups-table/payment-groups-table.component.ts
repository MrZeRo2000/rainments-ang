import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentGroup} from '../../model/payment-group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {urlValidator} from '../../core/url-validator.directive';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';

@Component({
  selector: 'app-payment-groups-table',
  templateUrl: './payment-groups-table.component.html',
  styleUrls: ['./payment-groups-table.component.scss']
})
export class PaymentGroupsTableComponent extends CommonSimpleEditableTableComponent<PaymentGroup> {
  @ViewChild('inputName', {static: false}) inputNameElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    protected repository: PaymentGroupRepository
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

}
