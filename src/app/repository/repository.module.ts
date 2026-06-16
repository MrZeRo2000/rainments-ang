import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentRepository} from './payment-repository';
import {PaymentRefsRepository} from './payment-refs-repository';
import {UpdatePaymentObjectGroupRepository} from './update-payment-object-group-repository';
import {PaymentPersistRepository} from './payment-persist-repository';
import {PaymentObjectPeriodRepository} from './payment-object-period-repository';
import {PaymentRepRepository} from './payment-rep-repository';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        RestDataSource,
        PaymentRepository,
        PaymentPersistRepository,
        PaymentRefsRepository,
        UpdatePaymentObjectGroupRepository,
        PaymentObjectPeriodRepository,
        PaymentRepRepository,
    ] })
export class RepositoryModule { }
