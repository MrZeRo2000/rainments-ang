import {computed, Directive, OnDestroy, OnInit, signal} from '@angular/core';
import {Editable} from '../edit/edit-intf';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {BaseReadWriteRepository} from '../repository/read-write-repository';
import {EditMode, EditState} from '../edit/edit-state';
import {CommonEntity} from '../entity/common-entity';
import {FormGroup, UntypedFormGroup} from '@angular/forms';
import {debounceTime, defer, distinctUntilChanged, Subject, Subscription, tap} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {BaseCommonTableComponent, CommonTableComponent} from './common-table-component';
import {BaseReadRepository, ReadRepository} from '../repository/read-repository';
import {CrudRepository} from "../repository/crud-repository";
import {BaseCommonSimpleEditableTableComponent} from "./common-simple-editable-table-component";
import {toSignal} from "@angular/core/rxjs-interop";

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseCommonEditableTableComponent<R, W extends CommonEntity>
  extends BaseCommonTableComponent<R>
  implements OnInit, OnDestroy, Editable {
  bsModalRef: BsModalRef;
  editState: EditState<W>;
  editForm: UntypedFormGroup;

  persistSubscription: Subscription;

  protected constructor(
    protected ctor: new() => W,
    protected modalService: BsModalService,
    protected readRepository: BaseReadRepository<R>,
    protected repository: BaseReadWriteRepository<W>
  ) {
    super(readRepository);
  }

  // OnInit
  ngOnInit() {
    super.ngOnInit();
    this.persistSubscription = this.repository.getPersistSuccessObservable().subscribe((value) => {
      if (value) {
        this.editState = undefined;
        this.loadRepositoryData();
      }
    });
  }

  ngOnDestroy(): void {
    this.persistSubscription.unsubscribe();
  }

  // Editable interface
  getEditingState(): boolean {
    return this.readRepository.getDataAvailable() && !this.editState;
  }

  // Editable interface
  getEditState(): EditState<W> {
    return this.editState;
  }

  protected abstract setEditFocus(): void;

  protected requireFocus(): void {
    setTimeout(() => this.setEditFocus());
  }

  protected abstract buildForm(): UntypedFormGroup;

  protected abstract getDisplayItemName(item: W): string;

  protected validateCreate(): void {}

  protected validateSave(): void {}

  protected buildEditForm() {
    this.editForm = this.buildForm();
    this.editForm.valueChanges.subscribe(value => this.editFormChanged(value));
    /*
    this.editForm.valueChanges.subscribe( (val) => {
      this.editState.submitted = false;
    });
     */
  }

  protected editFormInit() {}

  protected editFormChanged(data: any) {}

  protected getWritableData(): W {
    // this version gives empty strings instead of no value
    // return Object.assign({}, this.editForm.value);

    const v = this.editForm.value;
    const d: any = {};
    Object.keys(v).forEach(c => {if (v[c] !== '') {d[c] = v[c]; }});
    return d;
  }

  protected getEditValue(item: any): any {
    const value = {};
    Object.keys(item).forEach(v => {
      if (item.hasOwnProperty(v) && (item[v] || item[v] === 0)) {
        value[v] = item[v].id || item[v];
      }
    });
    return value;
  }

  onAddClick(): void {
    this.buildEditForm();
    this.editState = new EditState<W>(EditMode.EM_CREATE, new this.ctor());
    this.editFormInit();
    this.requireFocus();
  }

  onDeleteClick(item: W): void {
    const resultSubject: Subject<W> = new Subject<W>();
    resultSubject.subscribe((result) => {
      this.repository.deleteItem(result.id);
    });
    const message = '<strong>' + this.getDisplayItemName(item) + '</strong> will be deleted. <BR>Are you sure?';
    const initialState  = {message, item, result: resultSubject};
    this.bsModalRef = this.modalService.show(ConfirmationModalDialogComponent, {initialState});
  }

  onEditClick(item: W): void {
    this.editState = new EditState<W>(EditMode.EM_EDIT, item);
    this.buildEditForm();
    this.editForm.patchValue(this.getEditValue(item));
    this.requireFocus();
  }

  onCreate(): void {
    this.editState.submitted = true;

    this.validateCreate();

    if (this.editForm.valid) {
      this.repository.postItem(this.getWritableData());
    }
  }

  onSave(): void {
    this.editState.submitted = true;

    this.validateSave();

    if (this.editForm.valid) {
      this.repository.putItem(this.editState.editItem.id, this.getWritableData());
    }
  }

  onCancel(): void {
    this.editState = undefined;
  }

  onDrop(event: any): void {
    const fromEntity = this.repository.getData()[event.previousIndex];
    const toEntity = this.repository.getData()[event.currentIndex];

    if (fromEntity && toEntity && fromEntity.id !== toEntity.id) {
      this.repository.moveItem(fromEntity.id, toEntity.id);
    }
  }

  onSetDefaultOrderClick(event: any): void {
    event.preventDefault();
    this.repository.setDefaultOrder();
  }
}


@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class CommonEditableTableComponent<R, W
  extends CommonEntity> extends CommonTableComponent<R>
  implements OnInit {

  editStateSignal = signal<EditState<W> | undefined>(undefined);

  /* eslint-disable @angular-eslint/prefer-inject */
  protected constructor(
    protected ctor: new() => W,
    protected modalService: BsModalService,
    protected readRepository: ReadRepository<R>,
    protected crudRepository: CrudRepository<W>
  ) {
    super(readRepository);
  }
  crudData$ = this.crudRepository.crudAction$.pipe(

  )

  crudDataSignal = toSignal(this.crudData$)

  editingSignal = computed(() => this.readRepository.loadingSignal() || this.editStateSignal())

  abstract editForm: FormGroup;

  editFormAction$ = defer(() => this.editForm.valueChanges).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => {
      const editState = this.editStateSignal()
      if (editState) {
        editState.submitted = false
        this.editStateSignal.set(editState)
      }
    })
  );

  ngOnInit() {
    super.ngOnInit();
  }

  onAddClick(): void {
    this.editStateSignal.set(new EditState<W>(EditMode.EM_CREATE, new this.ctor()))
  }

  onEditClick(item: W): void {

  }

  onDeleteClick(item: W): void {

  }

  onSave(): void {
    this.editStateSignal.set({...this.editingSignal() as EditState<W>, submitted: true});
    if (this.editForm.valid) {

    }
  }

  onCancel(): void {
    this.editStateSignal.set(undefined)
    this.editForm.reset()
  }

  onDrop(event: any): void {
    const fromEntity = this.readRepository.dataSignal()[event.previousIndex] as CommonEntity;
    const toEntity = this.readRepository.dataSignal()[event.currentIndex] as CommonEntity;

    if (fromEntity && toEntity && fromEntity.id !== toEntity.id) {
      //this.repository.moveItem(fromEntity.id, toEntity.id);
    }
  }

  onSetDefaultOrderClick(event: PointerEvent): void {
    event.preventDefault();
  }

}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class CommonSimpleEditableTableComponent<T extends CommonEntity> extends CommonEditableTableComponent<T, T> {

  protected constructor(
    protected ctor: new() => T,
    protected modalService: BsModalService,
    protected readRepository: ReadRepository<T>,
    protected crudRepository: CrudRepository<T>) {
    super(ctor, modalService, readRepository, crudRepository);
  }

}
