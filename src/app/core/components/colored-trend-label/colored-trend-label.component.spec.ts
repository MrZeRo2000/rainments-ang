import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredTrendLabelComponent } from './colored-trend-label.component';

describe('ColoredTrendLabelComponent', () => {
  let component: ColoredTrendLabelComponent;
  let fixture: ComponentFixture<ColoredTrendLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoredTrendLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredTrendLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
