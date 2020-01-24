import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentObjectsTableComponent } from './payment-objects-table.component';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {RestDataSource} from '../../model/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestUrlEnv} from '../../config/configuration';
import {ReactiveFormsModule} from '@angular/forms';

describe('PaymentObjectsTableComponent', () => {
  let component: PaymentObjectsTableComponent;
  let fixture: ComponentFixture<PaymentObjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentObjectsTableComponent ],
      providers: [RestUrlEnv, RestDataSource, PaymentObjectRepository],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentObjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
