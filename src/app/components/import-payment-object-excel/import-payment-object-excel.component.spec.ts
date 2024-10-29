import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPaymentObjectExcelComponent } from './import-payment-object-excel.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RepositoryModule} from '../../repository/repository.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ImportPaymentObjectExcelComponent', () => {
  let component: ImportPaymentObjectExcelComponent;
  let fixture: ComponentFixture<ImportPaymentObjectExcelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [ImportPaymentObjectExcelComponent],
    imports: [ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPaymentObjectExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
