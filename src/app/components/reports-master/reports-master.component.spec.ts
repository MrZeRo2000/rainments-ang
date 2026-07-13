import { ComponentFixture, TestBed } from '@angular/core/testing';

import ReportsMasterComponent from './reports-master.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReportsMasterComponent', () => {
  let component: ReportsMasterComponent;
  let fixture: ComponentFixture<ReportsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReportsMasterComponent, RouterTestingModule, ReactiveFormsModule],
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
