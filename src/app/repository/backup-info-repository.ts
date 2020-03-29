import {ReadRepository} from '../core/repository/read-repository';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Injectable} from '@angular/core';
import {BackupDatabaseInfo} from '../model/backup-database-info';

@Injectable()
export class BackupInfoRepository extends ReadRepository<BackupDatabaseInfo> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'app:backup_database_info');
  }
}
