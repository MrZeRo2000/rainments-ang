import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from './rest-data-source';
import {PaymentObjectRepository} from './payment-object-repository';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    RestDataSource,
    PaymentObjectRepository
  ]
})
export class ModelModule { }
