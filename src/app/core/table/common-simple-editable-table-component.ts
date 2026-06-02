import {CommonEntity} from '../entity/common-entity';
import {BaseCommonEditableTableComponent} from './common-editable-table-component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BaseReadWriteRepository} from '../repository/read-write-repository';
import {Directive} from '@angular/core';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseCommonSimpleEditableTableComponent<T extends CommonEntity>
  extends BaseCommonEditableTableComponent<T, T> {

  protected constructor(
    protected ctor: new() => T,
    protected modalService: BsModalService,
    protected repository: BaseReadWriteRepository<T>
  ) {
    super(ctor, modalService, repository, repository);
  }
}
