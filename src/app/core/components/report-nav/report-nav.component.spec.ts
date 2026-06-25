import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNavComponent } from './report-nav.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ReportNavComponent', () => {
  let component: ReportNavComponent;
  let fixture: ComponentFixture<ReportNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportNavComponent, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
