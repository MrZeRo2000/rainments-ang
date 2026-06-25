import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {Product} from '../../model/product';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {duplicateNamesValidator, precisionValidator} from '../../core/validators/form-validators';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {CdkDrag, CdkDragHandle, CdkDropList} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuItem} from '@angular/material/menu';
import {ErrorStateMatcher} from '@angular/material/core';
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
      CdkDropList,
      CdkDrag,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      CdkDragHandle,
      DragGripComponent,
      EditDeletePanelComponent,
      ReactiveFormsModule,
      SaveDialogPanelComponent,
      LoadingProgressComponent,
      MatMenuItem
    ],
    styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends CommonSimpleEditableTableComponent<Product> {
  private fb = inject(FormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  inputNameElement = viewChild<ElementRef<HTMLInputElement>>('inputName');

  displayedColumns = ['id', 'name', 'unitName', 'actions'];

  // Show field errors only once Save has been attempted (mirrors the old
  // Bootstrap behaviour that gated invalid-feedback on editState.submitted).
  readonly errorMatcher: ErrorStateMatcher = {
    isErrorState: (control) => !!control?.invalid && !!this.editStateSignal()?.submitted
  };

  counterPrecisionOptions = ['', '0', '1', '2'];

  constructor() {
    super(Product, inject(PRODUCT_READ_REPOSITORY), inject(PRODUCT_CRUD_REPOSITORY));

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
