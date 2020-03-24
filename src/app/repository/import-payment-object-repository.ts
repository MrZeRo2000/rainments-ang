import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {Subject} from 'rxjs';
import {PersistRepository} from '../core/repository/persist-repository';

@Injectable()
export class ImportPaymentObjectRepository {

  private readonly resourceName: string;
  private readonly persistRepository: PersistRepository;

  constructor(private dataSource: RestDataSource, private messagesService: MessagesService) {
    this.resourceName = 'payments:import_excel';
    this.persistRepository = new PersistRepository(messagesService);
  }

  public postFormData(formData: FormData): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postFormDataResponse(this.resourceName, formData));
  }

  getPersistData(): Subject<any> {
    return this.persistRepository.getPersistData();
  }

  getLoadingState(): Subject<boolean> {
    return this.persistRepository.getLoadingState();
  }
}
