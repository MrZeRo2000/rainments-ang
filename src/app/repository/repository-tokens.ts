import {inject, InjectionToken} from "@angular/core";
import {ReadRepository, withDates} from "../core/repository/read-repository";
import {RestDataSource} from "../data-source/rest-data-source";
import {MessagesService} from "../messages/messages.service";
import {AppInfo} from "../model/app-info";
import {BackupDatabaseInfo} from "../model/backup-database-info";
import {PaymentObjectTotals} from "../model/payment-object-totals";
import {PaymentObject} from "../model/payment-object";
import {PaymentGroup} from "../model/payment-group";
import {Product} from "../model/product";
import {PaymentObjectGroupRefs} from "../model/payment-object-group-refs";
import {MessageResult} from "../model/message-result";
import {PaymentRefs} from "../model/payment-refs";
import {Payment} from "../model/payment";
import {PaymentRep} from "../model/payment-rep";
import {CrudRepository} from "../core/repository/crud-repository";
import {RowsAffectedResult} from "../model/rows-affected-result";

/**
 * Links each payment to its previous-period counterpart and builds the
 * prevProductPayments lookup (previously done in PaymentRefsRepository.afterLoadData).
 */
function mapPaymentRefs(raw: PaymentRefs): PaymentRefs {
  const refs = raw ?? new PaymentRefs();
  refs.prevProductPayments = new Map<number, Payment>();
  const prevPeriodPayments = refs.prevPeriodPaymentList;
  if (prevPeriodPayments) {
    (refs.paymentList ?? []).forEach(payment => {
      payment.prevPeriodPayment = prevPeriodPayments.find(value => value.product.id === payment.product.id);
      // title for delete
      payment["name"] = `${payment.paymentGroup?.name} \u2192 ${payment.paymentObject.name}`;
    });
    prevPeriodPayments.forEach(prev => refs.prevProductPayments.set(prev.product.id, prev));
  }
  return refs;
}

/** Converts each report payment's periodDate string to a Date. */
function mapPaymentRep(raw: PaymentRep): PaymentRep {
  raw?.paymentRepList?.forEach(payment => {
    if (payment.periodDate) {
      payment.periodDate = new Date(payment.periodDate);
    }
  });
  return raw;
}


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

export const BACKUP_DATABASE_CRUD_REPOSITORY = new InjectionToken<CrudRepository<MessageResult>>(
  'BACKUP_DATABASE_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'app:backup_database')
  });

export const PAYMENT_OBJECT_TOTALS_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentObjectTotals>>(
  'PAYMENT_OBJECT_TOTALS_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(
      inject(RestDataSource),
      inject(MessagesService),
      'payments:payment_object_totals_by_date',
      withDates<PaymentObjectTotals>('paymentDate'))
  });

export const PAYMENT_OBJECT_PERIOD_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentObjectTotals>>(
  'PAYMENT_OBJECT_PERIOD_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(
      inject(RestDataSource),
      inject(MessagesService),
      'payments:payment_object_period_by_id',
      withDates<PaymentObjectTotals>('paymentDate'))
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

export const PAYMENT_GROUP_UPDATE_CRUD_REPOSITORY = new InjectionToken<CrudRepository<RowsAffectedResult>>(
  'PAYMENT_GROUP_UPDATE_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'payments:update_payment_group')
  });


export const PRODUCT_READ_REPOSITORY = new InjectionToken<ReadRepository<Product>>(
  'PRODUCT_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'products')
  });

export const PRODUCT_CRUD_REPOSITORY = new InjectionToken<CrudRepository<Product>>(
  'PRODUCT_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'products')
  });

export const PAYMENT_OBJECT_GROUP_REFS_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentObjectGroupRefs>>(
  'PAYMENT_OBJECT_GROUP_REFS_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(inject(RestDataSource), inject(MessagesService), 'payments:payment_object_group_refs')
  });

export const PAYMENT_REFS_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentRefs>>(
  'PAYMENT_REFS_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(
      inject(RestDataSource),
      inject(MessagesService),
      'payments:refs',
      mapPaymentRefs)
  });

export const PAYMENT_CRUD_REPOSITORY = new InjectionToken<CrudRepository<Payment>>(
  'PAYMENT_CRUD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'payments')
  });

export const PAYMENT_DUPLICATE_PERIOD_REPOSITORY = new InjectionToken<CrudRepository<Payment>>(
  'PAYMENT_DUPLICATE_PERIOD_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new CrudRepository(inject(RestDataSource), inject(MessagesService), 'payments:duplicate_previous_period')
  });

export const PAYMENT_REP_READ_REPOSITORY = new InjectionToken<ReadRepository<PaymentRep>>(
  'PAYMENT_REP_READ_REPOSITORY',
  {
    providedIn: 'root',
    factory: () => new ReadRepository(
      inject(RestDataSource),
      inject(MessagesService),
      'payments:payments_by_payment_object_and_payment_period_date_range',
      mapPaymentRep)
  });
