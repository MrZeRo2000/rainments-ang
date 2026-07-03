import { Routes } from '@angular/router';
import { PaymentsDashboardComponent } from './components/payments-dashboard/payments-dashboard.component';
import { PaymentsMasterComponent } from './components/payments-master/payments-master.component';

export const routes: Routes = [
  { path: 'settings', loadComponent: () => import('./components/settings/settings.component'), },
  { path: 'payments/:id', component: PaymentsMasterComponent },
  { path: 'reports/:id', loadComponent: () => import('./components/reports-master/reports-master.component') },
  { path: '', component: PaymentsDashboardComponent, pathMatch: 'full' },
  { path: '**', component: PaymentsDashboardComponent }
];
