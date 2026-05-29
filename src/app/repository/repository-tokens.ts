import {inject, InjectionToken} from "@angular/core";
import {ReadRepository} from "../core/repository/read-repository";
import {RestDataSource} from "../data-source/rest-data-source";
import {MessagesService} from "../messages/messages.service";
import {AppInfo} from "../model/app-info";


export const APP_INFO_READ_REPOSITORY = new InjectionToken<ReadRepository<AppInfo>>(
  'APP_INFO_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'app-info')
  });
