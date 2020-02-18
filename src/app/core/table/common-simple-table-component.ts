import {CommonTableComponent} from './common-table-component';
import {ReadRepository} from '../read-repository';
import {ReadWriteRepository} from '../read-write-repository';

export class CommonSimpleTableComponent<T> extends CommonTableComponent <T, T> {
  constructor(protected repository: ReadWriteRepository<T>) {
    super(repository, repository);
  }
}
