import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMasterComponent } from './reports-master.component';
import {PaymentRepRepository} from '../../repository/payment-rep-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {MessagesModule} from '../../messages/messages.module';
import {RepositoryModule} from '../../repository/repository.module';
import {ReportsTableComponent} from '../reports-table/reports-table.component';
import {ReportsChartDateTotalsComponent} from '../reports-chart-date-totals/reports-chart-date-totals.component';
import {ReportsTableDisplayOptionsComponent} from '../reports-table-display-options/reports-table-display-options.component';

describe('ReportsMasterComponent', () => {
  let component: ReportsMasterComponent;
  let fixture: ComponentFixture<ReportsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsMasterComponent, ReportsTableComponent, ReportsChartDateTotalsComponent, ReportsTableDisplayOptionsComponent ],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, CoreModule, MessagesModule, RepositoryModule]
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
