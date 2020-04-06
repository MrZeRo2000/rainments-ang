import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {PersistRepositoryDecorator} from '../core/repository/persist-repository-decorator';
import {AppPersistRepository} from './app-persist-repository';

@Injectable()
export class BackupDatabaseRepository extends PersistRepositoryDecorator {

  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: AppPersistRepository,
    protected  messagesService: MessagesService
  ) {
    super(dataSource, persistRepository, messagesService, 'app:backup_database');
  }

  public postBackupRequest(): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, {}));
  }
}
