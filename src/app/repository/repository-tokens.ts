import {inject, InjectionToken} from "@angular/core";
import {ReadRepository} from "../core/repository/read-repository";
import {RestDataSource} from "../data-source/rest-data-source";
import {MessagesService} from "../messages/messages.service";
import {AppInfo} from "../model/app-info";
import {BackupDatabaseInfo} from "../model/backup-database-info";
import {PaymentObjectTotals} from "../model/payment-object-totals";
import {PaymentObject} from "../model/payment-object";
import {PaymentGroup} from "../model/payment-group";
import {CrudRepository} from "../core/repository/crud-repository";


export const APP_INFO_READ_REPOSITORY = new InjectionToken<ReadRepository<AppInfo>>(
  'APP_INFO_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'app-info')
  });

export const BACKUP_INFO_READ_REPOSITORY = new InjectionToken<ReadRepository<BackupDatabaseInfo>>(
  'BACKUP_INFO_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'app:backup_database_info')
  });

export const PAYMENT_OBJECT_TOTALS_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentObjectTotals>>(
  'PAYMENT_OBJECT_TOTALS_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'payments:payment_object_totals_by_date')
  });

export const PAYMENT_OBJECT_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentObject>>(
  'PAYMENT_OBJECT_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'payment-objects')
  });

export const PAYMENT_OBJECT_CRUD_REPOSITORY = new InjectionToken<CrudRepository<PaymentObject>>(
  'PAYMENT_OBJECT_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'payment-objects')
  });

export const PAYMENT_GROUP_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentGroup>>(
  'PAYMENT_GROUP_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'payment-groups')
  });

export const PAYMENT_GROUP_CRUD_REPOSITORY = new InjectionToken<CrudRepository<PaymentGroup>>(
  'PAYMENT_GROUP_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'payment-groups')
  });
