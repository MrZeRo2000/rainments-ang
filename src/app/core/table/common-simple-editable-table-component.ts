import {CommonEntity} from '../entity/common-entity';
import {CommonEditableTableComponent} from './common-editable-table-component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ReadWriteRepository} from '../repository/read-write-repository';

export abstract class CommonSimpleEditableTableComponent<T extends CommonEntity>
  extends CommonEditableTableComponent<T, T> {

  protected constructor(
    protected ctor: new() => T,
    protected modalService: BsModalService,
    protected repository: ReadWriteRepository<T>
  ) {
    super(ctor, modalService, repository, repository);
  }
}
