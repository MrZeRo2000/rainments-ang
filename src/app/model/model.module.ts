import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSource} from './rest-data-source';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RestDataSource
  ]
})
export class ModelModule { }
