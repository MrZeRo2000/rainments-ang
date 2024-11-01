import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNavComponent } from './report-nav.component';
import {} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FontAwesomeIconsModule} from '../../../font-awesome-icons/font-awesome-icons.module';

describe('ReportNavComponent', () => {
  let component: ReportNavComponent;
  let fixture: ComponentFixture<ReportNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeIconsModule],
      declarations: [ ReportNavComponent ]
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
