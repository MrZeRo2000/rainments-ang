import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from '../data-source/rest-data-source';
import {UpdatePaymentObjectGroupRepository} from './update-payment-object-group-repository';
import {PaymentRepRepository} from './payment-rep-repository';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        RestDataSource,
        UpdatePaymentObjectGroupRepository,
        PaymentRepRepository,
    ] })
export class RepositoryModule { }
