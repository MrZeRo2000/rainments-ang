import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSummaryComponent } from './payments-summary.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CoreModule} from '../../core/core.module';
import {IterableDiffers} from '@angular/core';
import {RepositoryModule} from '../../repository/repository.module';

describe('PaymentsSummaryComponent', () => {
  let component: PaymentsSummaryComponent;
  let fixture: ComponentFixture<PaymentsSummaryComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsSummaryComponent ],
      providers: [RestUrlEnv, RestDataSource, IterableDiffers],
      imports: [HttpClientTestingModule, CoreModule, RepositoryModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
