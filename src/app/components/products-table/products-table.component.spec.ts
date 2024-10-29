import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTableComponent } from './products-table.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {ModalModule} from 'ngx-bootstrap/modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RepositoryModule} from '../../repository/repository.module';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [ProductsTableComponent],
    imports: [ReactiveFormsModule, ModalModule.forRoot(), CoreModule, RepositoryModule, FontAwesomeIconsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
