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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {CoreModule} from './core/core.module';
import { PaymentGroupsTableComponent } from './components/payment-groups-table/payment-groups-table.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { PaymentsMasterComponent } from './components/payments-master/payments-master.component';
import { PaymentsDateSelectionComponent } from './components/payments-date-selection/payments-date-selection.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import {RepositoryModule} from './repository/repository.module';
import { PaymentsSummaryComponent } from './components/payments-summary/payments-summary.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { ImportPaymentObjectExcelComponent } from './components/import-payment-object-excel/import-payment-object-excel.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PaymentsDashboardComponent,
    NavTopComponent,
    PaymentObjectsTableComponent,
    PaymentGroupsTableComponent,
    ProductsTableComponent,
    PaymentsMasterComponent,
    PaymentsDateSelectionComponent,
    PaymentsTableComponent,
    PaymentsSummaryComponent,
    ImportExportComponent,
    ImportPaymentObjectExcelComponent
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
        RepositoryModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
