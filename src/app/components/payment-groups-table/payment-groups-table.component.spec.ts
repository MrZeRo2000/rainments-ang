import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGroupsTableComponent } from './payment-groups-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RepositoryModule} from '../../repository/repository.module';

describe('PaymentGroupsTableComponent', () => {
  let component: PaymentGroupsTableComponent;
  let fixture: ComponentFixture<PaymentGroupsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGroupsTableComponent ],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
