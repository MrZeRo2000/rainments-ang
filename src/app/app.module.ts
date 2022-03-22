import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CoreModule} from './core/core.module';
// fontawesome
import {FontAwesomeIconsModule} from './font-awesome-icons/font-awesome-icons.module';
import { PaymentGroupsTableComponent } from './components/payment-groups-table/payment-groups-table.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { PaymentsMasterComponent } from './components/payments-master/payments-master.component';
import { PaymentsDateSelectionComponent } from './components/payments-date-selection/payments-date-selection.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import {RepositoryModule} from './repository/repository.module';
import { PaymentsSummaryComponent } from './components/payments-summary/payments-summary.component';
import { DataManagementComponent } from './components/data-managment/data-management.component';
import { ImportPaymentObjectExcelComponent } from './components/import-payment-object-excel/import-payment-object-excel.component';
import { BackupDatabaseComponent } from './components/backup-database/backup-database.component';
import { PaymentsTableDisplayOptionsComponent } from './components/payments-table-display-options/payments-table-display-options.component';
import { UpdatePaymentGroupComponent } from './components/update-payment-group/update-payment-group.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReportsMasterComponent } from './components/reports-master/reports-master.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ReportsTableComponent } from './components/reports-table/reports-table.component';
import { ReportsColumnDisplayComponent } from './components/reports-column-display/reports-column-display.component';
import { ReportsChartDateTotalsComponent } from './components/reports-chart-date-totals/reports-chart-date-totals.component';
import { AppInfoComponent } from './components/app-info/app-info.component';
import { PaymentsSelectablePanelComponent } from './components/payments-selectable-panel/payments-selectable-panel.component';

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
    DataManagementComponent,
    ImportPaymentObjectExcelComponent,
    BackupDatabaseComponent,
    PaymentsTableDisplayOptionsComponent,
    UpdatePaymentGroupComponent,
    ReportsMasterComponent,
    ReportsTableComponent,
    ReportsColumnDisplayComponent,
    ReportsChartDateTotalsComponent,
    AppInfoComponent,
    PaymentsSelectablePanelComponent
  ],
    imports: [
        BrowserModule,
        DragDropModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CoreModule,
        ModelModule,
        ConfigModule,
        MessagesModule,
        RepositoryModule,
        FormsModule,
        FontAwesomeIconsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
