import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {PaymentObject} from '../../model/payment-object';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {duplicateNamesValidator, termValidator} from '../../core/validators/form-validators';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {TimePeriod, TimePeriodType} from '../../core/utils/time-period';
import {AddPanelComponent} from "../../core/components/add-panel/add-panel.component";
import {DropDownMoreMenuComponent} from "../../core/components/drop-down-more-menu/drop-down-more-menu.component";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ErrorStateMatcher} from "@angular/material/core";
import {DragGripComponent} from "../../core/components/drag-grip/drag-grip.component";
import {EditDeletePanelComponent} from "../../core/components/edit-delete-panel/edit-delete-panel.component";
import {SaveDialogPanelComponent} from "../../core/components/save-dialog-panel/save-dialog-panel.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {CommonSimpleEditableTableComponent} from "../../core/table/common-editable-table-component";
import {PAYMENT_OBJECT_CRUD_REPOSITORY, PAYMENT_OBJECT_READ_REPOSITORY} from "../../repository/repository-tokens";
import {MatMenuItem} from "@angular/material/menu";

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  imports: [
    AddPanelComponent,
    DropDownMoreMenuComponent,
    CdkDropList,
    CdkDrag,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DragGripComponent,
    CdkDragHandle,
    EditDeletePanelComponent,
    ReactiveFormsModule,
    SaveDialogPanelComponent,
    LoadingProgressComponent,
    MatMenuItem
  ],
  styleUrls: ['./payment-objects-table.component.scss']
})
export class PaymentObjectsTableComponent extends CommonSimpleEditableTableComponent<PaymentObject> {
  private fb = inject(FormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  inputNameElement = viewChild<ElementRef<HTMLInputElement>>('inputName');

  displayedColumns = ['id', 'name', 'actions'];

  // Show field errors only once the user has attempted to save (mirrors the old
  // Bootstrap behaviour that gated `invalid-feedback` on editState.submitted).
  readonly errorMatcher: ErrorStateMatcher = {
    isErrorState: (control) => !!control?.invalid && !!this.editStateSignal()?.submitted
  };

  periodTypes = [[], [TimePeriodType.M, 'Month'], [TimePeriodType.Q, 'Quarter']];
  termTypes = [[], [TimePeriodType.D, 'Day'], [TimePeriodType.M, 'Month']];
  termQuantities = [...Array(31)].map((c, i) => i === 0 ? undefined : i.toString(10))
  payDelays = [[], [0, 'Current Period'], [1, 'Next Period']]

  constructor() {
    super(PaymentObject, inject(PAYMENT_OBJECT_READ_REPOSITORY), inject(PAYMENT_OBJECT_CRUD_REPOSITORY));

    effect(() => this.inputNameElement()?.nativeElement.focus());
  }

  editForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required, duplicateNamesValidator(this.readRepository.dataSignal)]],
        period: [''],
        termQuantity: [''],
        termType: [''],
        payDelay: ['']},
    {validators: termValidator()});

  protected getPersistData(): PaymentObject {
    const o: any = super.getPersistData();

    const termPeriod = new TimePeriod(o.termType, o.termQuantity);

    delete o.termQuantity;
    delete o.termPeriod;

    if (termPeriod && termPeriod.toString()) {
      o.term = termPeriod.toString();
    }

    return o;
  }

  protected getEditValue(item: any): any {
    const value = super.getEditValue(item);

    const termPeriod = TimePeriod.fromString(value.term);
    delete value.term;

    if (termPeriod) {
      value.termType = termPeriod.periodType;
      value.termQuantity = termPeriod.quantity;
    }

    return value;
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
