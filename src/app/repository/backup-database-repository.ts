import {Injectable} from '@angular/core';
import {PersistRepository} from '../core/repository/persist-repository';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Subject} from 'rxjs';

@Injectable()
export class BackupDatabaseRepository {
  private readonly resourceName: string;
  private readonly persistRepository: PersistRepository;

  constructor(private dataSource: RestDataSource, private messagesService: MessagesService) {
    this.resourceName = 'app:backup_database';
    this.persistRepository = new PersistRepository(messagesService);
  }

  public postBackupRequest(): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postResponse(this.resourceName, {}));
  }

  getPersistData(): Subject<any> {
    return this.persistRepository.getPersistData();
  }

  getPersistSuccess(): Subject<any> {
    return this.persistRepository.getPersistSuccess();
  }

  getLoadingState(): Subject<boolean> {
    return this.persistRepository.getLoadingState();
  }

}
