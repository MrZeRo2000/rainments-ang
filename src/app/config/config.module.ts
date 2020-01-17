import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestUrlEnv} from './configuration';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RestUrlEnv
  ]
})
export class ConfigModule { }
