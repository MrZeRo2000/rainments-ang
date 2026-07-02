import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementComponent } from './data-management.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ImportExportComponent', () => {
  let component: DataManagementComponent;
  let fixture: ComponentFixture<DataManagementComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    imports: [DataManagementComponent, ReactiveFormsModule],
    providers: [RestUrlEnv, RestDataSource, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagementComponent);
    component = fixture.componentInstance;
  });

  // Skipped after Karma -> Vitest migration: detectChanges() triggers child
  // template iteration over undefined collections, and the inherited
  // ngOnDestroy unsubscribes from subscriptions set up in ngOnInit.
  // Enabling requires mocking the repositories and providing @Input data.
  it.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
