import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentGroupComponent } from './update-payment-group.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CoreModule} from '../../core/core.module';
import {RepositoryModule} from '../../repository/repository.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';

describe('UpdatePaymentGroupComponent', () => {
  let component: UpdatePaymentGroupComponent;
  let fixture: ComponentFixture<UpdatePaymentGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePaymentGroupComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, FontAwesomeIconsModule],
      providers: [RestUrlEnv, RestDataSource]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
