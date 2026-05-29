import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTableDisplayOptionsComponent } from './reports-table-display-options.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('ReportsTableDisplayOptionsComponent', () => {
  let component: ReportsTableDisplayOptionsComponent;
  let fixture: ComponentFixture<ReportsTableDisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsTableDisplayOptionsComponent, ReactiveFormsModule]
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
