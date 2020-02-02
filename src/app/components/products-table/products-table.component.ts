import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonEditableTableComponent} from '../../core/common-editable-table-component';
import {Product} from '../../model/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {ProductRepository} from '../../model/product-repository';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends CommonEditableTableComponent<Product> {
  @ViewChild('inputName', {static: false}) inputNameElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    protected repository: ProductRepository
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

}
