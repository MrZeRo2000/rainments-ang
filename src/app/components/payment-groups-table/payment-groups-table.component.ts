import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {PaymentGroup} from '../../model/payment-group';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {duplicateNamesValidator, urlValidator} from '../../core/validators/form-validators';
import {AddPanelComponent} from "../../core/components/add-panel/add-panel.component";
import {DropDownMoreMenuComponent} from "../../core/components/drop-down-more-menu/drop-down-more-menu.component";
import {NgClass, NgStyle} from "@angular/common";
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";
import {DragGripComponent} from "../../core/components/drag-grip/drag-grip.component";
import {EditDeletePanelComponent} from "../../core/components/edit-delete-panel/edit-delete-panel.component";
import {SaveDialogPanelComponent} from "../../core/components/save-dialog-panel/save-dialog-panel.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {CommonSimpleEditableTableComponent} from "../../core/table/common-editable-table-component";
import {PAYMENT_GROUP_CRUD_REPOSITORY, PAYMENT_GROUP_READ_REPOSITORY} from "../../repository/repository-tokens";

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
  private fb = inject(FormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  inputNameElement = viewChild<ElementRef<HTMLInputElement>>('inputName');

  preview = false;

  getPreviewColor(): string {
    return this.preview ? this.editForm.controls.color.value : '#FFFFFF';
  }

  constructor() {
    super(PaymentGroup, inject(PAYMENT_GROUP_READ_REPOSITORY), inject(PAYMENT_GROUP_CRUD_REPOSITORY));

    effect(() => this.inputNameElement()?.nativeElement.focus());
  }

  editForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, duplicateNamesValidator(this.readRepository.dataSignal)]],
    url: ['', urlValidator()],
    color: ['#FFFFFF']
  });

  protected getPersistData(): PaymentGroup {
    const o: any = super.getPersistData();

    if (o.color && o.color.toUpperCase() === '#FFFFFF') {
      o.color = null;
    }

    return o;
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
