import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObjectRepository} from './payment-object-repository';
import {HttpClientModule} from '@angular/common/http';
import {PaymentGroupRepository} from './payment-group-repository';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    RestDataSource,
    PaymentObjectRepository,
    PaymentGroupRepository
  ]
})
export class ModelModule { }
