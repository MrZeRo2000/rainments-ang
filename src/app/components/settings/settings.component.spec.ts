import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ReactiveFormsModule} from '@angular/forms';
import {RepositoryModule} from '../../repository/repository.module';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [SettingsComponent, ReactiveFormsModule, AlertModule,
        RepositoryModule, FontAwesomeIconsModule],
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
