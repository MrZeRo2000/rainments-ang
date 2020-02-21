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

  private static roundValue(value: any): number {
    return Math.round(value * 100) / 100;
  }

  constructor(
    private fb: FormBuilder,
    protected modalService: BsModalService,
    protected readRepository: PaymentRefsRepository,
    protected editRepository: PaymentRepository
  ) {
    super(
      Payment,
      modalService,
      readRepository,
      editRepository
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

  getConfig(): CommonTableConfig {
    return new CommonTableConfig(false);
  }

  getHttpParams(): HttpParams {
    const result = new HttpParams();
    result.append('paymentObjectId', this.paymentObjectId.toString());
    result.append('date', JSON.stringify(this.paymentPeriodDate));
    return result;
  }

  private checkInput() {
    if (this.paymentObjectId && this.paymentPeriodDate) {
      console.log('Ready to load paymentObjectId=' + this.paymentObjectId + ', date=' + this.paymentPeriodDate);
      this.loadRepositoryData();
    }
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      paymentGroup: [this.getPaymentGroups()[0] && this.getPaymentGroups()[0].id, Validators.required],
      product: [this.getProducts()[0] && this.getProducts()[0].id, Validators.required],
      productCounter: ['', Validators.compose([Validators.min(0)])],
      paymentAmount: ['0', Validators.compose([Validators.required, Validators.min(0)])],
      commissionAmount: ['0', Validators.compose([Validators.required, Validators.min(0)])]
      }
    );
  }

  protected getDisplayItemName(item: Payment): string {
    return item.product.name;
  }

  protected setEditFocus(): void {
  }

  protected validateCreate(): void {
    const productDuplicates = this.getPayments().filter(
      v => v.product.id === this.editForm.controls.product.value
    );
    if (productDuplicates.length > 0) {
      this.editForm.controls.product.setErrors({existingProduct: true});
    }
  }

  protected validateSave(): void {
    const productDuplicates = this.getPayments().filter(
      v => v.product.id === this.editForm.controls.product.value && v.id !== this.editState.editItem.id
    );
    if (productDuplicates.length > 0) {
      this.editForm.controls.product.setErrors({existingProduct: true});
    }
  }

  getPayments(): Payment[] {
    return this.readRepository.getData()[0].paymentList;
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
    const paymentGroup: PaymentGroup = this.getPaymentGroups().find(value => value.id === this.editForm.controls.paymentGroup.value);
    const product: Product = this.getProducts().find(value => value.id === this.editForm.controls.product.value);

    return new Payment(
      undefined,
      new Date(),
      new Date(this.paymentPeriodDate.setMinutes(this.paymentPeriodDate.getMinutes() - this.paymentPeriodDate.getTimezoneOffset())),
      paymentObject,
      paymentGroup,
      product,
      PaymentsTableComponent.roundValue(this.editForm.controls.productCounter.value),
      PaymentsTableComponent.roundValue(this.editForm.controls.paymentAmount.value),
      PaymentsTableComponent.roundValue(this.editForm.controls.commissionAmount.value)
    );
  }

  onCreate(): void {
    /*
    const paymentObject: PaymentObject = this.getPaymentObjects().find(value => value.id === this.paymentObjectId);
    const paymentGroup: PaymentGroup = this.getPaymentGroups().find(value => value.id === this.editForm.controls.paymentGroup.value);
    const product: Product = this.getProducts().find(value => value.id === this.editForm.controls.product.value);

    const payment = new Payment(
        undefined,
        new Date(),
        new Date(this.paymentPeriodDate.setMinutes(this.paymentPeriodDate.getMinutes() - this.paymentPeriodDate.getTimezoneOffset())),
        paymentObject,
        paymentGroup,
        product,
        this.editForm.controls.productCounter.value,
        this.editForm.controls.paymentAmount.value,
        this.editForm.controls.commissionAmount.value
    );

    alert(JSON.stringify(payment));
     */
    super.onCreate();
  }

}
