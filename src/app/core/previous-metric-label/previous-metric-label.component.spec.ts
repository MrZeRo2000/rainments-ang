import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousMetricLabelComponent } from './previous-metric-label.component';

describe('PreviousMetricLabelComponent', () => {
  let component: PreviousMetricLabelComponent;
  let fixture: ComponentFixture<PreviousMetricLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousMetricLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousMetricLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
