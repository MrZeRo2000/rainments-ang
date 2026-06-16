import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {Product} from '../../model/product';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {duplicateNamesValidator, precisionValidator} from '../../core/validators/form-validators';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {NgClass} from '@angular/common';
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from '@angular/cdk/drag-drop';
import {AddPanelComponent} from '../../core/components/add-panel/add-panel.component';
import {DropDownMoreMenuComponent} from '../../core/components/drop-down-more-menu/drop-down-more-menu.component';
import {DragGripComponent} from '../../core/components/drag-grip/drag-grip.component';
import {EditDeletePanelComponent} from '../../core/components/edit-delete-panel/edit-delete-panel.component';
import {SaveDialogPanelComponent} from '../../core/components/save-dialog-panel/save-dialog-panel.component';
import {LoadingProgressComponent} from '../../core/components/loading-progress/loading-progress.component';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-editable-table-component';
import {PRODUCT_CRUD_REPOSITORY, PRODUCT_READ_REPOSITORY} from '../../repository/repository-tokens';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    imports: [
      AddPanelComponent,
      DropDownMoreMenuComponent,
      NgClass,
      CdkDropList,
      CdkDrag,
      CdkDragPreview,
      CdkDragHandle,
      DragGripComponent,
      EditDeletePanelComponent,
      ReactiveFormsModule,
      SaveDialogPanelComponent,
      LoadingProgressComponent
    ],
    styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends CommonSimpleEditableTableComponent<Product> {
  private fb = inject(FormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  inputNameElement = viewChild<ElementRef<HTMLInputElement>>('inputName');

  counterPrecisionOptions = ['', '0', '1', '2'];

  constructor() {
    super(Product, inject(BsModalService), inject(PRODUCT_READ_REPOSITORY), inject(PRODUCT_CRUD_REPOSITORY));

    effect(() => this.inputNameElement()?.nativeElement.focus());
  }

  editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, duplicateNamesValidator(this.readRepository.dataSignal)]],
      unitName: [''],
      counterPrecision: ['']},
    {validators: precisionValidator()});

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
