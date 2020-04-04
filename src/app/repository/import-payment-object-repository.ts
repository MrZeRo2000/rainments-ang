import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {PersistRepositoryDecorator} from '../core/repository/persist-repository-decorator';

@Injectable()
export class ImportPaymentObjectRepository extends PersistRepositoryDecorator {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'payments:import_excel');
  }

  public postFormData(formData: FormData): void {
    this.persistRepository.handlePersistHttpResponse(this.dataSource.postFormDataResponse(this.resourceName, formData));
  }
}
