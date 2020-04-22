import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProductRepository} from '../../repository/product-repository';
import {CommonSimpleEditableTableComponent} from '../../core/table/common-simple-editable-table-component';
import {DragHandlerService} from '../../core/services/drag-handler.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends CommonSimpleEditableTableComponent<Product> {
  @ViewChild('inputName') inputNameElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    public repository: ProductRepository,
    public dragHandlerService: DragHandlerService
  ) {
    super(Product, modalService, repository);
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        unitName: ['']
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
}
