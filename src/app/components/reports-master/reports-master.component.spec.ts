import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMasterComponent } from './reports-master.component';
import {PaymentRepRepository} from '../../repository/payment-rep-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {MessagesModule} from '../../messages/messages.module';
import {RepositoryModule} from '../../repository/repository.module';
import {ReportsTableComponent} from '../reports-table/reports-table.component';
import {ReportsChartDateTotalsComponent} from '../reports-chart-date-totals/reports-chart-date-totals.component';
import {ReportsTableDisplayOptionsComponent} from '../reports-table-display-options/reports-table-display-options.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReportsMasterComponent', () => {
  let component: ReportsMasterComponent;
  let fixture: ComponentFixture<ReportsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ReportsMasterComponent, ReportsTableComponent, ReportsChartDateTotalsComponent, ReportsTableDisplayOptionsComponent],
    imports: [RouterTestingModule, ReactiveFormsModule, CoreModule, MessagesModule, RepositoryModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
