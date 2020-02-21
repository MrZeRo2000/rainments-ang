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
      productCounter: ['0.00', Validators.compose([Validators.required, Validators.min(0)])],
      paymentAmount: ['0.00', Validators.compose([Validators.required, Validators.min(0)])],
      commissionAmount: ['0.00', Validators.compose([Validators.required, Validators.min(0)])]
      }
    );
  }

  protected getDisplayItemName(item: Payment): string {
    return '';
  }

  protected setEditFocus(): void {
  }

  getPayments(): Payment[] {
    return this.readRepository.getData()[0].paymentList;
  }

  getPaymentGroups(): PaymentGroup[] {
    return this.readRepository.getData()[0].paymentGroupList;
  }

  getProducts(): Product[] {
    return this.readRepository.getData()[0].productList;
  }

  onCreate(): void {
    alert(JSON.stringify(this.editForm.value));
    // super.onSave();
  }

}
