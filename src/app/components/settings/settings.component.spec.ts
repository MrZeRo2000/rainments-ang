import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {PaymentObjectsTableComponent} from '../payment-objects-table/payment-objects-table.component';
import {PaymentObjectRepository} from '../../repository/payment-object-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MessagesModule} from '../../messages/messages.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {PaymentGroupsTableComponent} from '../payment-groups-table/payment-groups-table.component';
import {PaymentGroupRepository} from '../../repository/payment-group-repository';
import {ProductRepository} from '../../repository/product-repository';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {RepositoryModule} from '../../repository/repository.module';
import {DataManagementComponent} from '../data-managment/data-management.component';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [SettingsComponent,
        PaymentObjectsTableComponent, PaymentGroupsTableComponent, ProductsTableComponent, DataManagementComponent],
    imports: [ReactiveFormsModule, AlertModule.forRoot(), ModalModule.forRoot(),
        MessagesModule, CoreModule, RepositoryModule, FontAwesomeIconsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
