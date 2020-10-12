import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDashboardComponent } from './payments-dashboard.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {MessagesModule} from '../../messages/messages.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RepositoryModule} from '../../repository/repository.module';

describe('PaymentsDashboardComponent', () => {
  let component: PaymentsDashboardComponent;
  let fixture: ComponentFixture<PaymentsDashboardComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsDashboardComponent ],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, CoreModule, MessagesModule, RepositoryModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
