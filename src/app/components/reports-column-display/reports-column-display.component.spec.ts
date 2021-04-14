import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsColumnDisplayComponent } from './reports-column-display.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';

describe('ReportsColumnDisplayComponent', () => {
  let component: ReportsColumnDisplayComponent;
  let fixture: ComponentFixture<ReportsColumnDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsColumnDisplayComponent ],
      imports: [ReactiveFormsModule, CoreModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsColumnDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
