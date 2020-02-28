import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {reduce} from 'rxjs/operators';
import {CommonEditableTableComponent} from '../../core/table/common-editable-table-component';
import {PaymentRefs} from '../../model/payment-refs';
import {Payment} from '../../model/payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {PaymentRepository} from '../../repository/payment-repository';
import {CommonTableConfig} from '../../core/table/common-table-component';
import {HttpParams} from '@angular/common/http';
import {PaymentGroup} from '../../model/payment-group';
import {Product} from '../../model/product';
import {PaymentObject} from '../../model/payment-object';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent extends CommonEditableTableComponent<PaymentRefs, Payment> implements OnInit, OnChanges {
  @Input()
  paymentObjectId: number;

  @Input()
  paymentPeriodDate: Date;

  prevPeriodPayment: Payment;
  productUsage: number;
  productUsageForm: FormGroup = this.fb.group({productUsageCounter: ['']});

  selectedItems: Set<number> = new Set<number>();

  private static roundValue(value: any): number {
    return Math.round(value * 100) / 100;
  }

  private getPaymentPeriodDate(): Date {
    return new Date(
      this.paymentPeriodDate.setMinutes(this.paymentPeriodDate.getMinutes() - this.paymentPeriodDate.getTimezoneOffset())
    );
  }

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    public readRepository: PaymentRefsRepository,
    protected repository: PaymentRepository
  ) {
    super(
      Payment,
      modalService,
      readRepository,
      repository
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes[propName].isFirstChange()) {
        return;
      }
    }

    this.checkInput();
  }

  protected getConfig(): CommonTableConfig {
    return new CommonTableConfig(false);
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams()
      .append('paymentObjectId', this.paymentObjectId.toString())
      .append('paymentPeriodDate', this.getPaymentPeriodDate().toJSON())
      ;
  }

  private checkInput() {
    if (this.paymentObjectId && this.paymentPeriodDate) {
      console.log('Ready to load paymentObjectId=' + this.paymentObjectId + ', date=' + this.paymentPeriodDate);
      this.onCancel();
      this.loadRepositoryData();
    }
  }

  protected loadRepositoryData(): void {
    super.loadRepositoryData();
    this.selectedItems.clear();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      paymentGroup: ['', Validators.required],
      product: ['', Validators.required],
      // paymentGroup: [this.getPaymentGroups()[0] && this.getPaymentGroups()[0].id, Validators.required],
      // product: [this.getProducts()[0] && this.getProducts()[0].id, Validators.required],
      productCounter: ['', Validators.compose([Validators.min(0)])],
      paymentAmount: ['', Validators.compose([Validators.required, Validators.min(0)])],
      commissionAmount: ['', Validators.compose([Validators.min(0)])]
      }
    );
  }

  private updateProductUsage() {
    if (this.prevPeriodPayment && this.prevPeriodPayment.productCounter && this.editForm.controls.productCounter.value) {
      this.productUsage = Number.parseFloat(this.editForm.controls.productCounter.value) - this.prevPeriodPayment.productCounter;
    } else {
      this.productUsage = undefined;
    }
    this.productUsageForm.controls.productUsageCounter.setValue(this.productUsage);
  }

  protected editFormChanged(data: any) {
    super.editFormChanged(data);
    if (data.product !== '') {
      this.prevPeriodPayment = this.getPrevPeriodPaymentByProduct(Number.parseInt(data.product, 0));
      this.updateProductUsage();
    } else {
      this.prevPeriodPayment = undefined;
    }
  }

  protected getDisplayItemName(item: Payment): string {
    return item.product.name;
  }

  protected setEditFocus(): void {
  }

  protected validateCreate(): void {
    const productDuplicates = this.getPayments().filter(
      v => v.product.id === Number.parseInt(this.editForm.controls.product.value, 0)
    );
    if (productDuplicates.length > 0) {
      this.editForm.controls.product.setErrors({existingProduct: true});
    }
    if (this.productUsage && this.productUsage < 0) {
      this.editForm.controls.productCounter.setErrors({lessThanPreviousPeriod: true});
    }
  }

  protected validateSave(): void {
    const productDuplicates = this.getPayments().filter(
      v => v.product.id === Number.parseInt(this.editForm.controls.product.value, 0) && v.id !== this.editState.editItem.id
    );
    if (productDuplicates.length > 0) {
      this.editForm.controls.product.setErrors({existingProduct: true});
    }
  }

  getPayments(): Payment[] {
    return this.readRepository.getData()[0] ? this.readRepository.getData()[0].paymentList : [];
  }

  getPrevPeriodPayments(): Payment[] {
    return this.readRepository.getData()[0] ? this.readRepository.getData()[0].prevPeriodPaymentList : [];
  }

  getPrevPeriodPaymentByProduct(productId: number): Payment {
    return this.getPrevPeriodPayments() && this.getPrevPeriodPayments().filter(value => value.product.id === productId)[0];
  }

  getPaymentObjects(): PaymentObject[] {
    return this.readRepository.getData()[0].paymentObjectList;
  }

  getPaymentGroups(): PaymentGroup[] {
    return this.readRepository.getData()[0].paymentGroupList;
  }

  getProducts(): Product[] {
    return this.readRepository.getData()[0].productList;
  }

  protected getWritableData(): Payment {
    const paymentObject: PaymentObject = this.getPaymentObjects().find(value => value.id === this.paymentObjectId);
    const paymentGroup: PaymentGroup = this.getPaymentGroups().find(
      value => value.id === Number.parseInt(this.editForm.controls.paymentGroup.value, 0));
    const product: Product = this.getProducts().find(
      value => value.id === Number.parseInt(this.editForm.controls.product.value, 0));
    const commissionAmount = this.editForm.controls.commissionAmount.value || 0;

    return new Payment(
      undefined,
      new Date(),
      this.getPaymentPeriodDate(),
      paymentObject,
      paymentGroup,
      product,
      PaymentsTableComponent.roundValue(this.editForm.controls.productCounter.value),
      PaymentsTableComponent.roundValue(this.editForm.controls.paymentAmount.value),
      PaymentsTableComponent.roundValue(commissionAmount)
    );
  }

  tableRowClick(id: number): void {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }
  }
}
