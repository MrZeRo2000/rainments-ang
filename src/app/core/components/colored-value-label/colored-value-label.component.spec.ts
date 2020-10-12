import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredValueLabelComponent } from './colored-value-label.component';

describe('ColoredValueLabelComponent', () => {
  let component: ColoredValueLabelComponent;
  let fixture: ComponentFixture<ColoredValueLabelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ColoredValueLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredValueLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
