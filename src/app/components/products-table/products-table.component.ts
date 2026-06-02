import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProductRepository} from '../../repository/product-repository';
import {BaseCommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {NgClass} from '@angular/common';
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from '@angular/cdk/drag-drop';
import {AddPanelComponent} from '../../core/components/add-panel/add-panel.component';
import {DropDownMoreMenuComponent} from '../../core/components/drop-down-more-menu/drop-down-more-menu.component';
import {DragGripComponent} from '../../core/components/drag-grip/drag-grip.component';
import {EditDeletePanelComponent} from '../../core/components/edit-delete-panel/edit-delete-panel.component';
import {SaveDialogPanelComponent} from '../../core/components/save-dialog-panel/save-dialog-panel.component';
import {LoadingProgressComponent} from '../../core/components/loading-progress/loading-progress.component';

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
export class ProductsTableComponent extends BaseCommonSimpleEditableTableComponent<Product> {
  private fb = inject(UntypedFormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  @ViewChild('inputName') inputNameElement: ElementRef;

  counterPrecisionOptions = ['', '0', '1', '2'];

  /* eslint-disable @angular-eslint/prefer-inject */
  constructor(
    protected modalService: BsModalService,
    public repository: ProductRepository) {
    super(Product, modalService, repository);
  }

  protected buildForm(): UntypedFormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        unitName: [''],
        counterPrecision: ['']
      }
    );
  }

  protected  getDisplayItemName(item: Product): string {
    return item.name;
  }

  getProducts(): Product[] {
    return this.repository.getData();
  }

  protected setEditFocus(): void {
    this.inputNameElement.nativeElement.focus();
  }

  private validatePrecision(): void {
    if (this.editForm.controls.unitName.value.trim() === '' && this.editForm.controls.counterPrecision.value !== '') {
      this.editForm.controls.counterPrecision.setErrors({precisionForEmptyUnitName: true});
    }
  }

  protected validateCreate(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    this.validatePrecision();
  }

  protected validateSave(): void {
    const nameDuplicates = this.repository.getData().filter(
      (v) => v.name === this.editForm.controls.name.value && v.id !== this.editState.editItem.id
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
    this.validatePrecision();
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
