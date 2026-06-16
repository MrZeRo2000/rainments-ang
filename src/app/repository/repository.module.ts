import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObjectRepository} from './payment-object-repository';
import {PaymentRepository} from './payment-repository';
import {PaymentRefsRepository} from './payment-refs-repository';
import {ImportPaymentObjectRepository} from './import-payment-object-repository';
import {UpdatePaymentObjectGroupRepository} from './update-payment-object-group-repository';
import {ImportPaymentObjectPersistRepository} from './import-payment-object-persist-repository';
import {PaymentObjectPersistRepository} from './payment-object-persist-repository';
import {PaymentPersistRepository} from './payment-persist-repository';
import {PaymentObjectPeriodRepository} from './payment-object-period-repository';
import {PaymentRepRepository} from './payment-rep-repository';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        RestDataSource,
        PaymentObjectRepository,
        PaymentObjectPersistRepository,
        PaymentRepository,
        PaymentPersistRepository,
        PaymentRefsRepository,
        ImportPaymentObjectRepository,
        UpdatePaymentObjectGroupRepository,
        ImportPaymentObjectPersistRepository,
        PaymentObjectPeriodRepository,
        PaymentRepRepository,
    ] })
export class RepositoryModule { }
