import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentObjectsTableComponent } from './payment-objects-table.component';
import {RestDataSource} from '../../data-source/rest-data-source';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestUrlEnv} from '../../config/configuration';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RepositoryModule} from '../../repository/repository.module';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';

describe('PaymentObjectsTableComponent', () => {
  let component: PaymentObjectsTableComponent;
  let fixture: ComponentFixture<PaymentObjectsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentObjectsTableComponent],
      providers: [RestUrlEnv, RestDataSource],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentObjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
