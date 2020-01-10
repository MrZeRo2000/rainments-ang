import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './components/settings/settings.component';
import {PaymentsDashboardComponent} from './components/payments-dashboard/payments-dashboard.component';


const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: '', component: PaymentsDashboardComponent, pathMatch: 'full'},
  {path: '**', component: PaymentsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
