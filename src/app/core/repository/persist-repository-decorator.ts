import {PersistParams, PersistRepository} from './persist-repository';
import {RestDataSource} from '../../data-source/rest-data-source';
import {MessagesService} from '../../messages/messages.service';
import {Subject} from 'rxjs';

export abstract class PersistRepositoryDecorator {

  protected constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: PersistRepository,
    protected messagesService: MessagesService,
    protected resourceName: string
  ) {  }

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
