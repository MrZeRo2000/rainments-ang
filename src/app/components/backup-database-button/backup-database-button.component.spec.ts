import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDatabaseButtonComponent } from './backup-database-button.component';
import {RepositoryModule} from "../../repository/repository.module";
import {RestUrlEnv} from "../../config/configuration";
import {RestDataSource} from "../../data-source/rest-data-source";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('BackupDatabaseButtonComponent', () => {
  let component: BackupDatabaseButtonComponent;
  let fixture: ComponentFixture<BackupDatabaseButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackupDatabaseButtonComponent, RepositoryModule],
      providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    fixture = TestBed.createComponent(BackupDatabaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
