import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RestDataSource} from '../data-source/rest-data-source';
import {PaymentObjectRepository} from './payment-object-repository';
import {PaymentGroupRepository} from './payment-group-repository';
import {ProductRepository} from './product-repository';
import {PaymentRepository} from './payment-repository';
import {PaymentRefsRepository} from './payment-refs-repository';



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
    PaymentGroupRepository,
    ProductRepository,
    PaymentRepository,
    PaymentRefsRepository
  ]
})
export class RepositoryModule { }
