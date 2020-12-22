import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './components/settings/settings.component';
import {PaymentsDashboardComponent} from './components/payments-dashboard/payments-dashboard.component';
import {PaymentsMasterComponent} from './components/payments-master/payments-master.component';
import {ReportsMasterComponent} from './components/reports-master/reports-master.component';


const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'payments/:id', component: PaymentsMasterComponent},
  {path: 'reports/:id', component: ReportsMasterComponent},
  {path: '', component: PaymentsDashboardComponent, pathMatch: 'full'},
  {path: '**', component: PaymentsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
