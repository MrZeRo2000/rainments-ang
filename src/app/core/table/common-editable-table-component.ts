import {computed, DestroyRef, Directive, inject, OnInit, signal} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {EditMode, EditState} from '../edit/edit-state';
import {CommonEntity} from '../entity/common-entity';
import {FormGroup} from '@angular/forms';
import {debounceTime, defer, distinctUntilChanged, tap} from 'rxjs';
import {ConfirmationModalDialogComponent} from '../components/confirmation-modal-dialog/confirmation-modal-dialog.component';
import {CommonTableComponent} from './common-table-component';
import {ReadRepository} from '../repository/read-repository';
import {CrudActionType, CrudRepository, CrudStatus} from "../repository/crud-repository";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";

@Directive()

export abstract class CommonEditableTableComponent<R, W
  extends CommonEntity> extends CommonTableComponent<R>
  implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  editStateSignal = signal<EditState<W> | undefined>(undefined);

  crudLoadingSignal = signal(false)

  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.crudLoadingSignal())

  /* eslint-disable @angular-eslint/prefer-inject */
  protected constructor(
    protected ctor: new() => W,
    protected readRepository: ReadRepository<R>,
    protected crudRepository: CrudRepository<W>
  ) {
    super(readRepository);
  }
  crudData$ = this.crudRepository.crudAction$.pipe(
    tap(v => {
      if (v.status === CrudStatus.Success) {
        this.editStateSignal.set(undefined)
        this.editForm.reset()
        this.loadRepositoryData()
      }
      this.crudLoadingSignal.set(false);
    })
  )

  crudDataSignal = toSignal(this.crudData$)

  // Hide the table while ANY operation is in flight (read load, create/edit, or
  // delete) — loadingSignal already covers read + crud loading.
  editingSignal = computed(() => this.loadingSignal() || this.editStateSignal())

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

  protected getPersistData(): W {
    // this version gives empty strings instead of no value
    // return Object.assign({}, this.editForm.value);

    const v: Record<string, unknown> = this.editForm.value;
    const d: Record<string, unknown> = {};
    Object.keys(v).forEach(c => {if (v[c] !== '') {d[c] = v[c]; }});
    return d as unknown as W;
  }

  protected getEditValue(item: Record<string, unknown>): Record<string, unknown> {
    const value: Record<string, unknown> = {};
    Object.keys(item).forEach(v => {
      const itemValue = item[v];
      if (Object.prototype.hasOwnProperty.call(item, v) && (itemValue || itemValue === 0)) {
        value[v] = (itemValue as {id?: unknown} | undefined)?.id || itemValue;
      }
    });
    return value;
  }

  protected getEntityByPosition(id: number): CommonEntity | undefined {
    return this.readRepository.dataSignal()?.[id] as CommonEntity
  }

  ngOnInit() {
    super.ngOnInit();
    // editFormAction$ is a side-effect-only stream (debounce form changes -> clear
    // the "submitted" flag). It produces no value we render, so we don't route it
    // through toSignal/async; we just activate it and tie its lifetime to the view.
    this.editFormAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  onAddClick(): void {
    this.editStateSignal.set(new EditState<W>(EditMode.EM_CREATE, new this.ctor()))
  }

  onEditClick(item: W): void {
    console.log(`Editing item: ${JSON.stringify(item)}`);
    this.editStateSignal.set(new EditState<W>(EditMode.EM_EDIT, item))
    this.editForm.patchValue(this.getEditValue(item as unknown as Record<string, unknown>));
  }

  onDeleteClick(item: W): void {
    const o = item as unknown as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(o, 'name')) {
      const name = o['name'] as string;
      const message = '<strong>' + name + '</strong> will be deleted. <BR>Are you sure?';
      this.dialog.open(ConfirmationModalDialogComponent, {data: {message}, minWidth: '450px'})
        .afterClosed()
        .subscribe(confirmed => {
          if (confirmed) {
            console.log(`Delete PersistData: ${JSON.stringify(item)}`);
            // Mirror onSave: drive the loading UI (hide table + show progress)
            // while the delete + reload is in flight.
            this.crudLoadingSignal.set(true);
            this.crudRepository.execute({type: CrudActionType.Delete, payload: item});
          }
        });
    }
  }

  onSave(): void {
    this.editStateSignal.set({...this.editingSignal() as EditState<W>, submitted: true});
    if (this.editForm.valid) {
      this.crudLoadingSignal.set(true);

      const persistData = this.getPersistData();
      console.log(`PersistData: ${JSON.stringify(persistData)}`);

      switch(this.editStateSignal()?.editMode) {
        case EditMode.EM_CREATE:
          this.crudRepository.execute({type: CrudActionType.Insert, payload: this.getPersistData()});
          break
        case EditMode.EM_EDIT:
          console.log(`Updating with ${JSON.stringify(this.getPersistData())}`)
          this.crudRepository.execute({type: CrudActionType.Update, payload: this.getPersistData()});
          break;
      }
    }
  }

  onCancel(): void {
    this.editStateSignal.set(undefined)
    this.editForm.reset()
  }

  onDrop(event: CdkDragDrop<unknown>): void {
    const fromEntity = this.getEntityByPosition(event.previousIndex);
    const toEntity = this.getEntityByPosition(event.currentIndex);
    console.log(`event.previousIndex: ${event.previousIndex}, event.currentIndex: ${event.currentIndex}, From Entity: ${JSON.stringify(fromEntity)} to Entity: ${JSON.stringify(toEntity)}`);

    if (fromEntity && toEntity && fromEntity.id !== toEntity.id) {
      this.crudLoadingSignal.set(true);
      this.crudRepository.execute({type: CrudActionType.Move, payload: {sourceId: fromEntity.id, targetId: toEntity.id}});
    }
  }

  onSetDefaultOrderClick(event: PointerEvent): void {
    event.preventDefault();
    this.crudLoadingSignal.set(true);
    this.crudRepository.execute({type: CrudActionType.DefaultOrder, payload: {}});
  }

}

@Directive()

export abstract class CommonSimpleEditableTableComponent<T extends CommonEntity> extends CommonEditableTableComponent<T, T> {

  protected constructor(
    protected ctor: new() => T,
    protected readRepository: ReadRepository<T>,
    protected crudRepository: CrudRepository<T>) {
    super(ctor, readRepository, crudRepository);
  }

}
