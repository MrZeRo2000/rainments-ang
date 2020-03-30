import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {PaymentObjectsTableComponent} from '../payment-objects-table/payment-objects-table.component';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AlertModule, BsModalService, ModalModule} from 'ngx-bootstrap';
import {MessagesModule} from '../../messages/messages.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PaymentGroupsTableComponent} from '../payment-groups-table/payment-groups-table.component';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {ProductRepository} from '../../repository/product-repository';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {RepositoryModule} from '../../repository/repository.module';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent, PaymentObjectsTableComponent, PaymentGroupsTableComponent, ProductsTableComponent ],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, ReactiveFormsModule, AlertModule.forRoot(), ModalModule.forRoot(),
        MessagesModule, CoreModule, RepositoryModule, MessagesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
