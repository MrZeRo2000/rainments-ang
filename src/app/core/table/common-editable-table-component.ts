import {OnInit} from '@angular/core';
import {Editable} from '../edit-intf';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReadWriteRepository} from '../read-write-repository';
import {EditMode, EditState} from '../edit-state';
import {CommonEntity} from '../common-entity';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {DialogConfirmationComponent} from '../../components/dialog-confirmation/dialog-confirmation.component';
import {CommonTableComponent} from './common-table-component';
import {ReadRepository} from '../read-repository';
import {Payment} from '../../model/payment';

export abstract class CommonEditableTableComponent<R, W extends CommonEntity>
  extends CommonTableComponent<R, W>
  implements OnInit, Editable {
  bsModalRef: BsModalRef;
  editState: EditState<W>;
  editForm: FormGroup;

  protected constructor(
    protected ctor: new() => W,
    protected modalService: BsModalService,
    protected readRepository: ReadRepository<R>,
    protected repository: ReadWriteRepository<W>
  ) {
    super(readRepository, repository);
  }

  // OnInit
  ngOnInit() {
    super.ngOnInit();
    this.repository.getPersistSuccessObservable().subscribe((value) => {
      if (value) {
        this.editState = undefined;
        this.loadRepositoryData();
      }
    });
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

  protected editFormChanged(data: any) {}

  protected getWritableData(): W {
    return Object.assign({}, this.editForm.value);
  }

  protected getEditValue(item: Payment): any {
    const value = {};
    Object.keys(item).forEach(v => {
      if (item.hasOwnProperty(v) && item[v]) {
        value[v] = item[v].id || item[v];
      }
    });
    return value;
  }

  onAddClick(): void {
    this.buildEditForm();
    this.editState = new EditState<W>(EditMode.EM_CREATE, new this.ctor());
    this.requireFocus();
  }

  onDeleteClick(item: W): void {
    const resultSubject: Subject<W> = new Subject<W>();
    resultSubject.subscribe((result) => {
      this.repository.deleteItem(result.id);
    });
    const message = '<strong>' + this.getDisplayItemName(item) + '</strong> will be deleted. <BR>Are you sure?';
    const initialState  = {message, item, result: resultSubject};
    this.bsModalRef = this.modalService.show(DialogConfirmationComponent, {initialState});
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
}
