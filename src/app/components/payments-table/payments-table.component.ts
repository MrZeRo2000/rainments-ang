import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
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
import {InlineEditHandler, InlineEditSelection} from '../../core/inline-edit-handler';

enum InlineControl {
  ProductCounter = 'productCounterControl',
  PaymentAmount = 'paymentAmountControl',
  CommissionAmount = 'commissionAmountControl',
}

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent extends CommonEditableTableComponent<PaymentRefs, Payment> implements OnInit, OnChanges, AfterViewInit {

  @Input()
  paymentObjectId: number;

  @Input()
  paymentPeriodDate: Date;

  @ViewChildren('inlineControl') inlineControl: QueryList<ElementRef>;

  prevPeriodPayment: Payment;
  productUsage: number;
  productUsageForm: FormGroup = this.fb.group({productUsageCounter: ['']});

  selectedItems: Set<Payment> = new Set<Payment>();

  inlineControlType = InlineControl;
  inlineEditHandler: InlineEditHandler<Payment>;

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

  ngAfterViewInit(): void {
    this.setupFocusOnInit([
      this.inlineControl]
    );

    this.inlineEditHandler = new InlineEditHandler<Payment>();
    this.inlineEditHandler.inputValidator = ((item, selection) => {
      if (selection.controlName === InlineControl.ProductCounter) {
        const prevPeriodProductCounter = this.getPrevPeriodProductCounterByProduct(item.product.id);
        return selection.value === null || prevPeriodProductCounter === undefined
          || prevPeriodProductCounter <= Number.parseInt(selection.value, 0);
      } else if (selection.controlName === InlineControl.CommissionAmount) {
        return selection.value === null || Number.parseInt(selection.value, 0) >= 0;
      } else {
        return Number.parseInt(selection.value, 0) >= 0;
      }
    });

    this.inlineEditHandler.inputProcessor = ((item, selection) => {
      alert('HANDLER Entered value ' + selection.value + ' for editor ' + selection.controlName + ' for item ' + JSON.stringify(item));
    });
  }

  private setupFocusOnInit(viewQueryLists: QueryList<ElementRef>[]) {
    viewQueryLists.forEach(value => value.changes.subscribe(() => {
      if (value.length > 0) {
        value.first.nativeElement.focus();
      }
    }));
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

  getPrevPeriodProductCounterByProduct(productId: number): number {
    return this.getPrevPeriodPaymentByProduct(productId) && this.getPrevPeriodPaymentByProduct(productId).productCounter;
  }

  getPrevPeriodProductCounterEditDiffByProduct(productId: number): number {
    const prevPeriodValue = this.getPrevPeriodProductCounterByProduct(productId);
    const inputValue = this.inlineEditHandler.inlineSelection && Number.parseInt(this.inlineEditHandler.inlineSelection.value, 0);
    if (prevPeriodValue >= 0 && inputValue >= 0) {
      return inputValue - prevPeriodValue;
    } else {
      return undefined;
    }
  }

  getPrevPeriodPaymentAmountByProduct(productId: number): number {
    return this.getPrevPeriodPaymentByProduct(productId) && this.getPrevPeriodPaymentByProduct(productId).paymentAmount;
  }

  getPrevPeriodCommissionAmountByProduct(productId: number): number {
    return this.getPrevPeriodPaymentByProduct(productId) && this.getPrevPeriodPaymentByProduct(productId).commissionAmount;
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

  tableRowClick(item: Payment): void {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
  }

  productCounterOnClick(event: any, item: Payment): void {
    let initialValue = item.productCounter.toString();
    if (item.productCounter === 0) {
      const prevProductCounter = this.getPrevPeriodProductCounterByProduct(item.product.id);
      if (prevProductCounter && prevProductCounter > 0) {
        initialValue = prevProductCounter.toString();
      }
    }

    this.inlineEditHandler.inlineRefOnClick(event);
    this.inlineEditHandler.inlineSelection = new InlineEditSelection<Payment>(
      item,
      InlineControl.ProductCounter,
      initialValue
    );
  }

  paymentAmountOnClick(event: any, item: Payment): void {
    this.inlineEditHandler.inlineRefOnClick(event);
    this.inlineEditHandler.inlineSelection = new InlineEditSelection<Payment>(
      item,
      InlineControl.PaymentAmount,
      item.paymentAmount.toFixed(2)
    );
  }

  commissionAmountOnClick(event: any, item: Payment): void {
    this.inlineEditHandler.inlineRefOnClick(event);
    this.inlineEditHandler.inlineSelection = new InlineEditSelection<Payment>(
      item,
      InlineControl.CommissionAmount,
      item.commissionAmount.toFixed(2)
    );
  }
}
