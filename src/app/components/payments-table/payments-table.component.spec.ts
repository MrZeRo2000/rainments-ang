import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [PaymentsTableComponent, ReactiveFormsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
