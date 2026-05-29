import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {PaymentGroup} from '../../model/payment-group';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {urlValidator} from '../../core/directives/url-validator.directive';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {AddPanelComponent} from "../../core/components/add-panel/add-panel.component";
import {DropDownMoreMenuComponent} from "../../core/components/drop-down-more-menu/drop-down-more-menu.component";
import {NgClass, NgStyle} from "@angular/common";
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";
import {DragGripComponent} from "../../core/components/drag-grip/drag-grip.component";
import {EditDeletePanelComponent} from "../../core/components/edit-delete-panel/edit-delete-panel.component";
import {SaveDialogPanelComponent} from "../../core/components/save-dialog-panel/save-dialog-panel.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";

@Component({
  selector: 'app-payment-groups-table',
  templateUrl: './payment-groups-table.component.html',
  imports: [
    AddPanelComponent,
    DropDownMoreMenuComponent,
    NgClass,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    NgStyle,
    DragGripComponent,
    CdkDragHandle,
    EditDeletePanelComponent,
    ReactiveFormsModule,
    FormsModule,
    SaveDialogPanelComponent,
    LoadingProgressComponent
  ],
  styleUrls: ['./payment-groups-table.component.scss']
})
export class PaymentGroupsTableComponent extends CommonSimpleEditableTableComponent<PaymentGroup> {
  private fb = inject(UntypedFormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  @ViewChild('inputName') inputNameElement: ElementRef;

  preview: boolean = false;

  getPreviewColor(): string {
    return this.preview ? this.editForm.controls.color.value : '#FFFFFF';
  }

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    protected modalService: BsModalService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public repository: PaymentGroupRepository) {
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
