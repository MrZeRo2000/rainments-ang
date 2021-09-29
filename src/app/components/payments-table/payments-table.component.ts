import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {CommonEditableTableComponent} from '../../core/table/common-editable-table-component';
import {PaymentRefs} from '../../model/payment-refs';
import {Payment} from '../../model/payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PaymentRefsRepository} from '../../repository/payment-refs-repository';
import {PaymentRepository} from '../../repository/payment-repository';
import {CommonTableConfig} from '../../core/table/common-table-component';
import {HttpParams} from '@angular/common/http';
import {PaymentGroup} from '../../model/payment-group';
import {Product} from '../../model/product';
import {PaymentObject} from '../../model/payment-object';
import {InlineEditHandler, InlineEditSelection} from '../../core/edit/inline-edit-handler';
import {AmountPipe} from '../../core/pipes/amount.pipe';
import {ColorScheme} from '../../core/components/colored-value-label/colored-value-label.component';
import {PatchRequest} from '../../model/patch-request';
import {PaymentsTableDisplayOptions} from '../payments-table-display-options/payments-table-display-options.component';
import {Subscription} from 'rxjs';

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
export class PaymentsTableComponent extends CommonEditableTableComponent<PaymentRefs, Payment>
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input()
  paymentObjectId: number;

  @Input()
  paymentPeriodDate: Date;

  @Output()
  paymentObject = new EventEmitter<PaymentObject>();

  @ViewChildren('inlineControl') inlineControl: QueryList<ElementRef>;

  private convertedPeriodDate: Date;

  prevPeriodPayment: Payment;

  private prevProduct: number;

  productUsage: number;
  productUsageForm: FormGroup = this.fb.group({productUsageCounter: ['']});

  selectedItems: Set<Payment> = new Set<Payment>();

  inlineControlType = InlineControl;
  inlineEditHandler: InlineEditHandler<Payment>;

  colorSchemeType = ColorScheme;

  displayOptions: PaymentsTableDisplayOptions;

  private readonly loadSuccessSubscription: Subscription;

  private static roundValueTo(value: any, precision?: any): number {
    const rate = Math.pow(10, precision || 0);
    return rate === 0 ? value : Math.round(value * rate) / rate;
  }

  private static roundValue(value: any): number {
    return Math.round(value * 100) / 100;
  }

  private static validateNumericControl(control: any) {
    const value = control.value;
    if (value !== null && value !== '' && isNaN(value)) {
      control.setErrors({isNaN: true});
    }
  }

  private calcConvertedPeriodDate(): void {
    const result = new Date(this.paymentPeriodDate);

    result.setMinutes(
      result.getMinutes() - result.getTimezoneOffset()
    );

    this.convertedPeriodDate = new Date(result);
  }

  private getPaymentPeriodDate(): Date {
    return this.convertedPeriodDate;
  }

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    public readRepository: PaymentRefsRepository,
    protected repository: PaymentRepository,
    private amountPipe: AmountPipe
  ) {
    super(
      Payment,
      modalService,
      readRepository,
      repository
    );

    this.loadSuccessSubscription = readRepository.getLoadSuccessObservable().subscribe(v => {
      if (v) {
        this.paymentObject.emit(this.getPaymentObject());
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkInput();
    this.displayOptions = PaymentsTableDisplayOptions.fromLocalStorage();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.loadSuccessSubscription) {
      this.loadSuccessSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcConvertedPeriodDate();

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
        const prevPeriodProductCounter = this.getPrevPeriodProductCounter(item);
        return selection.value === null || prevPeriodProductCounter === undefined
          || prevPeriodProductCounter <= Number.parseFloat(selection.value);
      } else if (selection.controlName === InlineControl.CommissionAmount) {
        return selection.value === null || Number.parseInt(selection.value, 0) >= 0;
      } else {
        return Number.parseInt(selection.value, 0) >= 0;
      }
    });

    this.inlineEditHandler.inputProcessor = ((item, selection) => {
      const patchRequest = new PatchRequest('replace', '/' + selection.controlName.replace('Control', ''));
      if (selection.value) {
        if (selection.controlName === 'productCounterControl') {
          patchRequest.value = PaymentsTableComponent.roundValueTo(selection.value,
            item.product && item.product.counterPrecision).toString(10);
        } else {
          patchRequest.value = selection.value;
        }
      } else {
        if (['paymentAmountControl', 'commissionAmountControl'].includes(selection.controlName)) {
          patchRequest.value = '0';
        }
      }
      this.repository.patchItem(item.id, patchRequest);
      // alert('HANDLER Entered value ' + selection.value + ' for editor ' + selection.controlName + ' for item ' + JSON.stringify(item));
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
    const form = this.fb.group({
      paymentGroup: ['', Validators.required],
      product: ['', Validators.required],
      // paymentGroup: [this.getPaymentGroups()[0] && this.getPaymentGroups()[0].id, Validators.required],
      // product: [this.getProducts()[0] && this.getProducts()[0].id, Validators.required],
      productCounter: ['', Validators.compose([Validators.min(0)])],
      paymentAmount: ['', Validators.compose([Validators.required, Validators.min(0)])],
      commissionAmount: ['', Validators.compose([Validators.min(0)])]
      }
    );

    form.controls.product.valueChanges.subscribe(value => {
      form.controls.productCounter.setValue(null);
    });

    return form;
  }

  private updateProductUsage() {
    if (this.prevPeriodPayment && this.prevPeriodPayment.productCounter && this.editForm.controls.productCounter.value) {
      this.productUsage = Number.parseFloat(this.editForm.controls.productCounter.value) - this.prevPeriodPayment.productCounter;
    } else {
      this.productUsage = undefined;
    }
    this.productUsageForm.controls.productUsageCounter.setValue(
      this.amountPipe.transform(this.productUsage, this.getProduct() && this.getProduct().counterPrecision));
  }

  protected editFormInit() {
    super.editFormInit();
    this.prevPeriodPayment = undefined;
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
    if (this.productUsage && this.productUsage < 0) {
      this.editForm.controls.productCounter.setErrors({lessThanPreviousPeriod: true});
    }
  }

  getPayments(): Payment[] {
    return this.readRepository.getData()[0] ? this.readRepository.getData()[0].paymentList : [];
  }

  getPrevPeriodPayments(): Payment[] {
    return this.readRepository.getData()[0] ? this.readRepository.getData()[0].prevPeriodPaymentList : [];
  }

  getPrevPeriodProductCounter(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.productCounter;
  }

  getPrevPeriodPaymentDiff(item: Payment): number {
    const prevPeriodValue = item.prevPeriodPayment && item.prevPeriodPayment.paymentAmount;
    const currentValue = item.paymentAmount;
    if (prevPeriodValue && currentValue) {
      return currentValue - prevPeriodValue;
    } else {
      return null;
    }
  }

  getPrevPeriodCommissionDiff(item: Payment): number {
    const prevPeriodValue = item.prevPeriodPayment && item.prevPeriodPayment.commissionAmount;
    const currentValue = item.commissionAmount;
    if (prevPeriodValue && currentValue) {
      return currentValue - prevPeriodValue;
    } else {
      return null;
    }
  }

  getPrevPeriodPaymentByProduct(productId: number): Payment {
    return this.readRepository.getData()[0] &&
      this.readRepository.getData()[0].prevProductPayments &&
      this.readRepository.getData()[0].prevProductPayments.get(productId);
  }

  getPrevPeriodProductCounterDiffByProduct(item: Payment): number {
    const prevPeriodValue = this.getPrevPeriodProductCounter(item);
    const currentValue = item.productCounter;
    if (prevPeriodValue && currentValue) {
      return currentValue - prevPeriodValue;
    } else {
      return undefined;
    }
  }

  getPrevPeriodProductCounterEditDiffByProduct(item: Payment): number {
    const prevPeriodValue = this.getPrevPeriodProductCounter(item);
    const inputValue = this.inlineEditHandler.inlineSelection && Number.parseFloat(this.inlineEditHandler.inlineSelection.value);
    if (prevPeriodValue >= 0 && inputValue >= 0) {
      return inputValue - prevPeriodValue;
    } else {
      return undefined;
    }
  }

  getPrevPeriodPaymentAmount(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.paymentAmount;
  }

  getPrevPeriodCommissionAmount(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.commissionAmount;
  }

  getPaymentGroups(): PaymentGroup[] {
    return this.readRepository.getData()[0].paymentGroupList;
  }

  getPaymentGroup(): PaymentGroup {
    return this.getPaymentGroups().find(
      value => value.id === Number.parseInt(this.editForm.controls.paymentGroup.value, 0));
  }

  getProducts(): Product[] {
    return this.readRepository.getData()[0].productList;
  }

  getProduct(): Product {
    return this.getProducts().find(
      value => value.id === Number.parseInt(this.editForm.controls.product.value, 0));
  }

  getPaymentObject(): PaymentObject {
    return this.readRepository.getData()[0].paymentObject;
  }

  getProductCounter(): number {
    return this.editForm.controls.productCounter.value !== null && this.editForm.controls.productCounter.value !== '' ?
      PaymentsTableComponent.roundValueTo(this.editForm.controls.productCounter.value,
        this.getProduct() && this.getProduct().counterPrecision) : null;
  }

  getPaymentAmount(): number {
    return this.editForm.controls.paymentAmount.value;
  }

  getCommissionAmount(): number {
    return this.editForm.controls.commissionAmount.value || 0;
  }

  protected getWritableData(): Payment {
    const paymentObject: PaymentObject = this.getPaymentObject();
    const paymentGroup: PaymentGroup = this.getPaymentGroup();
    const product: Product = this.getProduct();
    const productCounter = this.getProductCounter();
    const paymentAmount = this.getPaymentAmount();
    const commissionAmount = this.getCommissionAmount();

    return new Payment(
      undefined,
      new Date(),
      this.getPaymentPeriodDate(),
      paymentObject,
      paymentGroup,
      product,
      productCounter,
      PaymentsTableComponent.roundValue(paymentAmount),
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
      const prevProductCounter = this.getPrevPeriodProductCounter(item);
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

  isCloneAvailable(): boolean {
    return this.getPrevPeriodPayments() && this.getPrevPeriodPayments().length > 0 && this.getPayments() && this.getPayments().length === 0;
  }

  duplicatePreviousPeriodOnClick(event: any) {
    event.preventDefault();
    this.repository.duplicatePreviousPeriod(this.paymentObjectId, this.getPaymentPeriodDate());
  }

  displayOptionsChanged() {
    this.displayOptions.saveToLocalStorage();
  }

  pervPeriodCounterLabelClick(event: any, productCounter: number) {
    event.preventDefault();
    this.editForm.controls.productCounter.setValue(productCounter);
  }

  numberOnPaste(event: any) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const convertedText = pastedText.replace(',', '.');
    this.editForm.controls.commissionAmount.setValue(convertedText);
  }
}
