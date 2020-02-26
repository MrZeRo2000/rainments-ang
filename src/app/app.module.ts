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
import { PaymentGroupsTableComponent } from './components/payment-groups-table/payment-groups-table.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { PaymentsMasterComponent } from './components/payments-master/payments-master.component';
import { PaymentsDateSelectionComponent } from './components/payments-date-selection/payments-date-selection.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import {RepositoryModule} from './repository/repository.module';
import { PaymentsSummaryComponent } from './components/payments-summary/payments-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PaymentsDashboardComponent,
    NavTopComponent,
    PaymentObjectsTableComponent,
    DialogConfirmationComponent,
    PaymentGroupsTableComponent,
    ProductsTableComponent,
    PaymentsMasterComponent,
    PaymentsDateSelectionComponent,
    PaymentsTableComponent,
    PaymentsSummaryComponent
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
    MessagesModule,
    RepositoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
