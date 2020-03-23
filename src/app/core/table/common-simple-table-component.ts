import {CommonTableComponent} from './common-table-component';
import {ReadRepository} from '../repository/read-repository';
import {ReadWriteRepository} from '../repository/read-write-repository';

export class CommonSimpleTableComponent<T> extends CommonTableComponent <T, T> {
  constructor(protected repository: ReadWriteRepository<T>) {
    super(repository, repository);
  }
}
