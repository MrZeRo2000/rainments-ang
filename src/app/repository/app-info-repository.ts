import {ReadRepository} from '../core/repository/read-repository';
import {AppInfo} from '../model/app-info';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';

@Injectable()
export class AppInfoRepository extends ReadRepository<AppInfo> {
  constructor(protected dataSource: RestDataSource, protected messagesService: MessagesService) {
    super(dataSource, messagesService, 'app-info');
  }
}
