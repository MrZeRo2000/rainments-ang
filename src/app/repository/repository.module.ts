import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from '../data-source/rest-data-source';
import {UpdatePaymentObjectGroupRepository} from './update-payment-object-group-repository';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        RestDataSource,
        UpdatePaymentObjectGroupRepository,
    ] })
export class RepositoryModule { }
