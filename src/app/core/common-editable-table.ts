import {OnInit} from '@angular/core';
import {Editable} from './edit-intf';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CommonRepository} from '../model/common-repository';
import {EditMode, EditState} from '../model/edit-state';
import {CommonEntity} from '../model/common-entity';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {DialogConfirmationComponent} from '../components/dialog-confirmation/dialog-confirmation.component';

export abstract class CommonEditableTable<T extends CommonEntity> implements OnInit, Editable {
  bsModalRef: BsModalRef;
  editState: EditState<T>;
  editForm: FormGroup;

  protected constructor(
    private ctor: new() => T,
    protected modalService: BsModalService,
    protected repository: CommonRepository<T>
  ) { }

  // OnInit
  ngOnInit() {
    this.repository.loadData();
    this.repository.getPersistSuccessObservable().subscribe((value) => {
      if (value) {
        this.editState = undefined;
        this.repository.loadData();
      }
    });
  }

  // Editable interface
  getEditingState(): boolean {
    return this.repository.getDataAvailable() && !this.editState;
  }

  // Editable interface
  getEditState(): EditState<T> {
    return this.editState;
  }

  protected abstract setEditFocus(): void;

  protected requireFocus(): void {
    setTimeout(() => this.setEditFocus());
  }

  protected abstract buildForm(): FormGroup;

  protected abstract getDisplayItemName(item: T): string;

  protected validateCreate(): void {}

  protected validateSave(): void {}

  onAddClick(): void {
    this.editForm = this.buildForm();
    this.editState = new EditState<T>(EditMode.EM_CREATE, new this.ctor());
    this.requireFocus();
  }

  onDeleteClick(item: T): void {
    const resultSubject: Subject<T> = new Subject<T>();
    resultSubject.subscribe((result) => {
      this.repository.deleteItem(result.id);
    });
    const message = '<strong>' + this.getDisplayItemName(item) + '</strong> will be deleted. <BR>Are you sure?';
    const initialState  = {message, item, result: resultSubject};
    this.bsModalRef = this.modalService.show(DialogConfirmationComponent, {initialState});
  }

  onEditClick(item: T): void {
    this.editState = new EditState<T>(EditMode.EM_EDIT, item);
    this.editForm = this.buildForm();
    this.editForm.patchValue(Object.assign({}, item));
    this.requireFocus();
  }

  onCreate(): void {
    this.editState.submitted = true;

    this.validateCreate();

    if (this.editForm.valid) {
      this.repository.postItem(Object.assign({}, this.editForm.value));
    }
  }

  onSave(): void {
    this.editState.submitted = true;

    this.validateSave();

    if (this.editForm.valid) {
      this.repository.putItem(this.editState.editItem.id, Object.assign({}, this.editForm.value));
    }
  }

  onCancel(): void {
    this.editState = undefined;
  }
}
