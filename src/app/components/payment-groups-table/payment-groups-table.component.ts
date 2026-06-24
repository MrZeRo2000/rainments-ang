import {Component, computed, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PaymentGroup} from '../../model/payment-group';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {DragHandlerService} from '../../core/services/drag-handler.service';
import {duplicateNamesValidator, urlValidator} from '../../core/validators/form-validators';
import {AddPanelComponent} from "../../core/components/add-panel/add-panel.component";
import {DropDownMoreMenuComponent} from "../../core/components/drop-down-more-menu/drop-down-more-menu.component";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ErrorStateMatcher} from "@angular/material/core";
import {DragGripComponent} from "../../core/components/drag-grip/drag-grip.component";
import {EditDeletePanelComponent} from "../../core/components/edit-delete-panel/edit-delete-panel.component";
import {SaveDialogPanelComponent} from "../../core/components/save-dialog-panel/save-dialog-panel.component";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {CommonSimpleEditableTableComponent} from "../../core/table/common-editable-table-component";
import {PAYMENT_GROUP_CRUD_REPOSITORY, PAYMENT_GROUP_READ_REPOSITORY} from "../../repository/repository-tokens";
import {MatMenuItem} from "@angular/material/menu";

@Component({
  selector: 'app-payment-groups-table',
  templateUrl: './payment-groups-table.component.html',
  imports: [
    AddPanelComponent,
    DropDownMoreMenuComponent,
    CdkDropList,
    CdkDrag,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    DragGripComponent,
    CdkDragHandle,
    EditDeletePanelComponent,
    ReactiveFormsModule,
    FormsModule,
    SaveDialogPanelComponent,
    LoadingProgressComponent,
    MatMenuItem
  ],
  styleUrls: ['./payment-groups-table.component.scss']
})
export class PaymentGroupsTableComponent extends CommonSimpleEditableTableComponent<PaymentGroup> {
  private fb = inject(FormBuilder)
  public dragHandlerService = inject(DragHandlerService)

  inputNameElement = viewChild<ElementRef<HTMLInputElement>>('inputName');

  displayedColumns = ['id', 'name', 'actions'];

  // Show field errors only once Save has been attempted (mirrors the old
  // Bootstrap behaviour that gated invalid-feedback on editState.submitted).
  readonly errorMatcher: ErrorStateMatcher = {
    isErrorState: (control) => !!control?.invalid && !!this.editStateSignal()?.submitted
  };

  preview = signal(false);

  private readonly DEFAULT_COLOR = '#FFFFFF';

  // Current (always valid) color value, kept in sync by the color valueChanges
  // handler in the constructor; drives the color input and the preview reactively.
  protected colorValue = signal<string>(this.DEFAULT_COLOR);

  // Color to paint the name field with: the chosen color while previewing, else white.
  readonly previewColor = computed(() => this.preview() ? this.colorValue() : this.DEFAULT_COLOR);

  constructor() {
    super(PaymentGroup, inject(PAYMENT_GROUP_READ_REPOSITORY), inject(PAYMENT_GROUP_CRUD_REPOSITORY));

    effect(() => this.inputNameElement()?.nativeElement.focus());

    // Mirror the color control into colorValue (drives the color input + preview);
    // empty/null (e.g. after editForm.reset()) shows as white.
    this.editForm.controls.color.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.colorValue.set(value || this.DEFAULT_COLOR));
  }

  editForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, duplicateNamesValidator(this.readRepository.dataSignal)]],
    url: ['', urlValidator()],
    color: [this.DEFAULT_COLOR]
  });

  protected getPersistData(): PaymentGroup {
    const o: any = super.getPersistData();

    if (o.color && o.color.toUpperCase() === this.DEFAULT_COLOR) {
      o.color = null;
    }

    return o;
  }

  // The native <input type="color"> is intentionally NOT bound via formControlName
  // (reset() would write '' to it -> "#rrggbb" console warning). It reads the
  // colorValue signal; user picks are pushed into the form control here.
  onColorInput(event: Event): void {
    this.editForm.controls.color.setValue((event.target as HTMLInputElement).value);
  }

  onDrop(event: any): void {
    this.dragHandlerService.stopDrag();
    super.onDrop(event);
  }
}
