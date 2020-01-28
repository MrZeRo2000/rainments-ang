import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentsDashboardComponent } from './components/payments-dashboard/payments-dashboard.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { ModelModule} from './model/model.module';
import { ConfigModule} from './config/config.module';
import { PaymentObjectsTableComponent } from './components/payment-objects-table/payment-objects-table.component';
import { MessagesModule} from './messages/messages.module';
import { ReactiveFormsModule} from '@angular/forms';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import {ModalModule} from 'ngx-bootstrap';
import {CoreModule} from './core/core.module';



@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PaymentsDashboardComponent,
    NavTopComponent,
    PaymentObjectsTableComponent,
    DialogConfirmationComponent
  ],
  // modal component not directly referenced in templates
  entryComponents: [
    DialogConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CoreModule,
    ModelModule,
    ConfigModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
