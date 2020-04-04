import {PersistParams, PersistRepository} from './persist-repository';
import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import {Subject} from 'rxjs';

export class PersistRepositoryDecorator {

  protected readonly persistRepository: PersistRepository;

  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService, protected resourceName: string) {
    this.persistRepository = new PersistRepository(messagesService);
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

  setDefaultPersistParams(persistParams: PersistParams): void {
    this.persistRepository.setDefaultPersistParams(persistParams);
  }
}
