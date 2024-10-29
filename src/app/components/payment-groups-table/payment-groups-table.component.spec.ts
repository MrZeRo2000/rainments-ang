import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGroupsTableComponent } from './payment-groups-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RepositoryModule} from '../../repository/repository.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentGroupsTableComponent', () => {
  let component: PaymentGroupsTableComponent;
  let fixture: ComponentFixture<PaymentGroupsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [PaymentGroupsTableComponent],
    imports: [ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
