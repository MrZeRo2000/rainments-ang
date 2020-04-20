import {OnDestroy, OnInit} from '@angular/core';
import {Editable} from '../edit/edit-intf';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReadWriteRepository} from '../repository/read-write-repository';
import {EditMode, EditState} from '../edit/edit-state';
import {CommonEntity} from '../entity/common-entity';
import {FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {CommonTableComponent} from './common-table-component';
import {ReadRepository} from '../repository/read-repository';

export abstract class CommonEditableTableComponent<R, W extends CommonEntity>
  extends CommonTableComponent<R>
  implements OnInit, OnDestroy, Editable {
  bsModalRef: BsModalRef;
  editState: EditState<W>;
  editForm: FormGroup;

  persistSubscription: Subscription;

  protected constructor(
    protected ctor: new() => W,
    protected modalService: BsModalService,
    protected readRepository: ReadRepository<R>,
    protected repository: ReadWriteRepository<W>
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
    super.ngOnDestroy();
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

  protected abstract buildForm(): FormGroup;

  protected abstract getDisplayItemName(item: W): string;

  protected validateCreate(): void {}

  protected validateSave(): void {}

  private buildEditForm() {
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
