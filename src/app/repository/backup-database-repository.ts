import {Injectable} from '@angular/core';
import {PersistRepository} from '../core/repository/persist-repository';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Subject} from 'rxjs';
import {PersistRepositoryDecorator} from '../core/repository/persist-repository-decorator';

@Injectable()
export class BackupDatabaseRepository extends PersistRepositoryDecorator {

  constructor(protected dataSource: RestDataSource, protected  messagesService: MessagesService) {
    super(dataSource, messagesService, 'app:backup_database');
  }

  public postBackupRequest(): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, {}));
  }
}
