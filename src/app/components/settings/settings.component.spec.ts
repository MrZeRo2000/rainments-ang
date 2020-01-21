import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {PaymentObjectsTableComponent} from '../payment-objects-table/payment-objects-table.component';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../model/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AlertModule} from 'ngx-bootstrap';
import {MessagesModule} from '../../messages/messages.module';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent, PaymentObjectsTableComponent ],
      providers: [RestUrlEnv, RestDataSource, PaymentObjectRepository],
      imports: [HttpClientTestingModule, AlertModule.forRoot(), MessagesModule]
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
