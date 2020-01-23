import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentsDashboardComponent } from './components/payments-dashboard/payments-dashboard.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import {ModelModule} from './model/model.module';
import {ConfigModule} from './config/config.module';
import { PaymentObjectsTableComponent } from './components/payment-objects-table/payment-objects-table.component';
import {MessagesModule} from './messages/messages.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PaymentsDashboardComponent,
    NavTopComponent,
    PaymentObjectsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModelModule,
    ConfigModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
