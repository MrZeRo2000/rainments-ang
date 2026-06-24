import {Component, computed, effect, ElementRef, inject, input, signal, viewChildren} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {CommonEditableTableComponent} from '../../core/table/common-editable-table-component';
import {CommonTableConfig} from '../../core/table/common-table-component';
import {CrudActionType, CrudStatus} from '../../core/repository/crud-repository';
import {EditMode} from '../../core/edit/edit-state';
import {PaymentRefs} from '../../model/payment-refs';
import {Payment} from '../../model/payment';
import {PatchRequest} from '../../model/patch-request';
import {InlineEditHandler} from '../../core/edit/inline-edit-handler';
import {SelectableItem} from '../../core/model/selectable-item';
import {AmountPipe} from '../../core/pipes/amount.pipe';
import {ColoredValueLabelComponent, ColorScheme} from '../../core/components/colored-value-label/colored-value-label.component';
import {PaymentsTableDisplayOptions, PaymentsTableDisplayOptionsComponent} from '../payments-table-display-options/payments-table-display-options.component';
import {AddPanelComponent} from '../../core/components/add-panel/add-panel.component';
import {PaymentsSelectablePanelComponent} from '../payments-selectable-panel/payments-selectable-panel.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgClass, NgStyle} from '@angular/common';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ColoredTrendLabelComponent} from '../../core/components/colored-trend-label/colored-trend-label.component';
import {InputPasteFloatModelDirective} from '../../core/directives/input-paste-float-model.directive';
import {EditDeletePanelComponent} from '../../core/components/edit-delete-panel/edit-delete-panel.component';
import {PaymentsSummaryComponent} from '../payments-summary/payments-summary.component';
import {InputPasteFloatControlDirective} from '../../core/directives/input-paste-float-control.directive';
import {SaveDialogPanelComponent} from '../../core/components/save-dialog-panel/save-dialog-panel.component';
import {LoadingProgressComponent} from '../../core/components/loading-progress/loading-progress.component';
import {
  PAYMENT_CRUD_REPOSITORY,
  PAYMENT_DUPLICATE_PERIOD_REPOSITORY,
  PAYMENT_REFS_READ_REPOSITORY
} from '../../repository/repository-tokens';

enum InlineControl {
  ProductCounter = 'productCounterControl',
  PaymentAmount = 'paymentAmountControl',
  CommissionAmount = 'commissionAmountControl',
}

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  imports: [
    AddPanelComponent,
    PaymentsSelectablePanelComponent,
    FaIconComponent,
    NgClass,
    PaymentsTableDisplayOptionsComponent,
    NgStyle,
    TooltipModule,
    ColoredValueLabelComponent,
    AmountPipe,
    FormsModule,
    ColoredTrendLabelComponent,
    InputPasteFloatModelDirective,
    EditDeletePanelComponent,
    PaymentsSummaryComponent,
    ReactiveFormsModule,
    InputPasteFloatControlDirective,
    SaveDialogPanelComponent,
    LoadingProgressComponent
  ],
  providers: [AmountPipe],
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent extends CommonEditableTableComponent<PaymentRefs, Payment> {
  private fb = inject(FormBuilder)
  private amountPipe = inject(AmountPipe)
  private duplicateRepository = inject(PAYMENT_DUPLICATE_PERIOD_REPOSITORY)

  paymentObjectId = input<number>();
  paymentPeriodDate = input<Date>();

  // Loads on input change (effect below), not on init.
  protected override config = new CommonTableConfig(false);

  inlineControlType = InlineControl;
  colorSchemeType = ColorScheme;
  inlineEditHandler = new InlineEditHandler<Payment>();

  displayOptions = signal(PaymentsTableDisplayOptions.fromLocalStorage());

  private inlineControls = viewChildren<ElementRef>('inlineControl');

  editForm = this.fb.group({
    paymentGroup: this.fb.control<string | null>('', Validators.required),
    product: this.fb.control<string | null>('', Validators.required),
    productCounter: this.fb.control<number | null>(null, Validators.min(0)),
    paymentAmount: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    commissionAmount: this.fb.control<number | null>(null, Validators.min(0))
  });

  private refs = computed(() => this.readRepository.dataSignal()[0]);
  payments = computed(() => this.refs()?.paymentList ?? []);
  prevPeriodPayments = computed(() => this.refs()?.prevPeriodPaymentList ?? []);
  paymentGroups = computed(() => this.refs()?.paymentGroupList ?? []);
  products = computed(() => this.refs()?.productList ?? []);

  selectableItems = signal<Array<SelectableItem<Payment>>>([]);
  selectedPayments = computed(() => this.selectableItems().filter(i => i.isSelected).map(i => i.value));

  cloneAvailable = computed(() => this.prevPeriodPayments().length > 0 && this.payments().length === 0);

  private convertedPeriodDate = computed(() => {
    const date = this.paymentPeriodDate();
    if (!date) {
      return undefined;
    }
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  });

  private editFormValue = toSignal(this.editForm.valueChanges);

  prevPeriodPayment = computed(() => {
    const value = this.editFormValue()?.product;
    const productId = value ? Number.parseInt(value, 10) : NaN;
    return Number.isNaN(productId) ? undefined : this.refs()?.prevProductPayments?.get(productId);
  });

  selectedPaymentGroup = computed(() => {
    const value = this.editFormValue()?.paymentGroup;
    const id = value ? Number.parseInt(value, 10) : NaN;
    return Number.isNaN(id) ? undefined : this.paymentGroups().find(g => g.id === id);
  });

  selectedProduct = computed(() => {
    const value = this.editFormValue()?.product;
    const id = value ? Number.parseInt(value, 10) : NaN;
    return Number.isNaN(id) ? undefined : this.products().find(p => p.id === id);
  });

  productUsage = computed(() => {
    const prev = this.prevPeriodPayment();
    const counter = this.editFormValue()?.productCounter;
    if (prev?.productCounter && counter != null) {
      return counter - prev.productCounter;
    }
    return undefined;
  });

  productUsageDisplay = computed(() =>
    this.amountPipe.transform(this.productUsage(), this.selectedProduct()?.counterPrecision));

  private static roundValueTo(value: any, precision?: any): number {
    const rate = Math.pow(10, precision || 0);
    return rate === 0 ? value : Math.round(value * rate) / rate;
  }

  private static roundValue(value: any): number {
    return Math.round(value * 100) / 100;
  }

  constructor() {
    super(
      Payment,
      inject(PAYMENT_REFS_READ_REPOSITORY),
      inject(PAYMENT_CRUD_REPOSITORY)
    );

    // Reload when the object/period inputs change, cancelling any open edit.
    effect(() => {
      const id = this.paymentObjectId();
      const date = this.convertedPeriodDate();
      if (id && date) {
        this.onCancel();
        this.loadRepositoryData();
      }
    });

    // Rebuild the (deselected) selectable rows whenever the loaded payments change.
    effect(() => {
      this.selectableItems.set(this.payments().map(p => new SelectableItem<Payment>(p, false)));
    });

    // Reset the counter when the product changes.
    this.editForm.controls.product.valueChanges.pipe(takeUntilDestroyed()).subscribe(() =>
      this.editForm.controls.productCounter.setValue(null));

    // Reload after a successful "duplicate previous period".
    toSignal(this.duplicateRepository.crudAction$.pipe(
      tap(result => {
        if (result.status === CrudStatus.Success) {
          this.loadRepositoryData();
        }
      })
    ));

    // Focus the inline editor input when it appears.
    effect(() => {
      const controls = this.inlineControls();
      if (controls.length > 0) {
        controls[0].nativeElement.focus();
      }
    });


    this.inlineEditHandler.inputValidator = (item, controlName, value) => {
      if (controlName === InlineControl.ProductCounter) {
        const prevPeriodProductCounter = this.getPrevPeriodProductCounter(item);
        return value === null || prevPeriodProductCounter === undefined
          || prevPeriodProductCounter <= Number.parseFloat(value);
      } else if (controlName === InlineControl.CommissionAmount) {
        return value === null || Number.parseInt(value, 10) >= 0;
      } else {
        return Number.parseInt(value, 10) >= 0;
      }
    };

    this.inlineEditHandler.inputProcessor = (item, controlName, value) => {
      const patchRequest = new PatchRequest('replace', '/' + controlName.replace('Control', ''));
      if (value) {
        if (controlName === InlineControl.ProductCounter) {
          patchRequest.value = PaymentsTableComponent.roundValueTo(value, item.product && item.product.counterPrecision).toString(10);
        } else {
          patchRequest.value = value;
        }
      } else if (controlName === InlineControl.PaymentAmount || controlName === InlineControl.CommissionAmount) {
        patchRequest.value = '0';
      }
      // Show the loading indicator from patch start until the reload completes.
      // crudData$ (base) clears crudLoadingSignal and reloads on success; the read
      // repository's loadingSignal then bridges through to reload completion.
      this.crudLoadingSignal.set(true);
      this.crudRepository.execute({type: CrudActionType.Patch, payload: {id: item.id, body: patchRequest}});
    };
  }

  protected override loadRepositoryData(): void {
    this.readRepository.loadData({
      params: new HttpParams()
        .append('paymentObjectId', this.paymentObjectId()!.toString())
        .append('paymentPeriodDate', this.convertedPeriodDate()!.toJSON())
    });
  }

  protected override getPersistData(): Payment {
    const editState = this.editStateSignal();
    const id = editState?.editMode === EditMode.EM_EDIT ? editState.editItem.id : undefined;
    return new Payment(
      id,
      new Date(),
      this.convertedPeriodDate(),
      this.refs()?.paymentObject,
      this.selectedPaymentGroup(),
      this.selectedProduct(),
      this.getProductCounter(),
      PaymentsTableComponent.roundValue(this.getPaymentAmount()),
      PaymentsTableComponent.roundValue(this.getCommissionAmount())
    );
  }

  override onSave(): void {
    // Cross-field validations that aren't expressible as pure control validators.
    const editId = this.editStateSignal()?.editItem?.id;
    const productId = Number.parseInt(this.editForm.controls.product.value ?? '', 10);
    if (this.payments().some(p => p.product.id === productId && p.id !== editId)) {
      this.editForm.controls.product.setErrors({existingProduct: true});
    }
    const usage = this.productUsage();
    if (usage != null && usage < 0) {
      this.editForm.controls.productCounter.setErrors({lessThanPreviousPeriod: true});
    }
    super.onSave();
  }

  private getProductCounter(): number {
    const value = this.editForm.controls.productCounter.value;
    return value != null
      ? PaymentsTableComponent.roundValueTo(value, this.selectedProduct() && this.selectedProduct().counterPrecision)
      : null;
  }

  private getPaymentAmount(): number {
    return this.editForm.controls.paymentAmount.value;
  }

  private getCommissionAmount(): number {
    return this.editForm.controls.commissionAmount.value || 0;
  }

  getPrevPeriodProductCounter(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.productCounter;
  }

  getPrevPeriodPaymentDiff(item: Payment): number {
    const prevPeriodValue = item.prevPeriodPayment && item.prevPeriodPayment.paymentAmount;
    const currentValue = item.paymentAmount;
    return prevPeriodValue && currentValue ? currentValue - prevPeriodValue : null;
  }

  getPrevPeriodCommissionDiff(item: Payment): number {
    const prevPeriodValue = item.prevPeriodPayment && item.prevPeriodPayment.commissionAmount;
    const currentValue = item.commissionAmount;
    return prevPeriodValue && currentValue ? currentValue - prevPeriodValue : null;
  }

  getPrevPeriodProductCounterDiffByProduct(item: Payment): number {
    const prevPeriodValue = this.getPrevPeriodProductCounter(item);
    const currentValue = item.productCounter;
    return prevPeriodValue && currentValue ? currentValue - prevPeriodValue : undefined;
  }

  getPrevPeriodProductCounterEditDiffByProduct(item: Payment): number {
    const prevPeriodValue = this.getPrevPeriodProductCounter(item);
    const inputValue = Number.parseFloat(this.inlineEditHandler.value());
    return prevPeriodValue >= 0 && inputValue >= 0 ? inputValue - prevPeriodValue : undefined;
  }

  getPrevPeriodPaymentAmount(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.paymentAmount;
  }

  getPrevPeriodCommissionAmount(item: Payment): number {
    return item.prevPeriodPayment && item.prevPeriodPayment.commissionAmount;
  }

  tableRowClick(item: SelectableItem<Payment>): void {
    item.isSelected = !item.isSelected;
    this.selectableItems.set([...this.selectableItems()]);
  }

  // The selectable panel mutates isSelected in place (select-all / clear-all);
  // re-set the signal so selection-derived state (summary, row highlight) updates.
  onSelectionChanged(): void {
    this.selectableItems.set([...this.selectableItems()]);
  }

  productCounterOnClick(event: any, item: Payment): void {
    let initialValue = item.productCounter.toString();
    if (item.productCounter === 0) {
      const prevProductCounter = this.getPrevPeriodProductCounter(item);
      if (prevProductCounter && prevProductCounter > 0) {
        initialValue = prevProductCounter.toString();
      }
    }
    this.inlineEditHandler.refOnClick(event);
    this.inlineEditHandler.start(item, InlineControl.ProductCounter, initialValue);
  }

  paymentAmountOnClick(event: any, item: Payment): void {
    this.inlineEditHandler.refOnClick(event);
    this.inlineEditHandler.start(item, InlineControl.PaymentAmount, item.paymentAmount.toFixed(2));
  }

  commissionAmountOnClick(event: any, item: Payment): void {
    this.inlineEditHandler.refOnClick(event);
    this.inlineEditHandler.start(item, InlineControl.CommissionAmount, item.commissionAmount.toFixed(2));
  }

  duplicatePreviousPeriodOnClick(event: any): void {
    event.preventDefault();
    this.duplicateRepository.postFormData(new HttpParams()
      .append('paymentObjectId', this.paymentObjectId()!.toString(10))
      .append('paymentPeriodDate', this.convertedPeriodDate()!.toJSON()));
  }

  pervPeriodCounterLabelClick(event: any, productCounter: number): void {
    event.preventDefault();
    this.editForm.controls.productCounter.setValue(productCounter);
  }
}
