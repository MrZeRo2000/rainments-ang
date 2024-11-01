import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObjectRepository} from './payment-object-repository';
import {PaymentGroupRepository} from './payment-group-repository';
import {ProductRepository} from './product-repository';
import {PaymentRepository} from './payment-repository';
import {PaymentRefsRepository} from './payment-refs-repository';
import {ImportPaymentObjectRepository} from './import-payment-object-repository';
import {BackupDatabaseRepository} from './backup-database-repository';
import {BackupInfoRepository} from './backup-info-repository';
import {PaymentObjectGroupRefsRepository} from './payment-object-group-refs-repository';
import {UpdatePaymentObjectGroupRepository} from './update-payment-object-group-repository';
import {UpdatePaymentObjectGroupPersistRepository} from './update-payment-object-group-persist-repository';
import {ImportPaymentObjectPersistRepository} from './import-payment-object-persist-repository';
import {BackupDatabasePersistRepository} from './backup-database-persist-repository';
import {PaymentGroupPersistRepository} from './payment-group-persist-repository';
import {PaymentObjectPersistRepository} from './payment-object-persist-repository';
import {ProductPersistRepository} from './product-persist-repository';
import {PaymentPersistRepository} from './payment-persist-repository';
import {PaymentObjectTotalsRepository} from './payment-object-totals-repository';
import {PaymentObjectPeriodRepository} from './payment-object-period-repository';
import {PaymentRepRepository} from './payment-rep-repository';
import {AppInfoRepository} from './app-info-repository';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        RestDataSource,
        PaymentObjectRepository,
        PaymentObjectPersistRepository,
        PaymentGroupRepository,
        PaymentGroupPersistRepository,
        ProductRepository,
        ProductPersistRepository,
        PaymentRepository,
        PaymentPersistRepository,
        PaymentRefsRepository,
        PaymentObjectGroupRefsRepository,
        ImportPaymentObjectRepository,
        BackupDatabaseRepository,
        BackupDatabasePersistRepository,
        BackupInfoRepository,
        UpdatePaymentObjectGroupRepository,
        UpdatePaymentObjectGroupPersistRepository,
        ImportPaymentObjectPersistRepository,
        BackupDatabasePersistRepository,
        PaymentObjectTotalsRepository,
        PaymentObjectPeriodRepository,
        PaymentRepRepository,
        AppInfoRepository,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class RepositoryModule { }
