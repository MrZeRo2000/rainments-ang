import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentsDashboardComponent } from './components/payments-dashboard/payments-dashboard.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { GetValuesPipe } from './pipes/get-values.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PaymentsDashboardComponent,
    NavTopComponent,
    GetValuesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
