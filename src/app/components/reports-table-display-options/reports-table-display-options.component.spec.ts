import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTableDisplayOptionsComponent } from './reports-table-display-options.component';
import {CoreModule} from '../../core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

describe('ReportsTableDisplayOptionsComponent', () => {
  let component: ReportsTableDisplayOptionsComponent;
  let fixture: ComponentFixture<ReportsTableDisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTableDisplayOptionsComponent ],
      imports: [ReactiveFormsModule, CoreModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTableDisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
