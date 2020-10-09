import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredTrendLabelComponent } from './colored-trend-label.component';
import {FontAwesomeIconsModule} from '../../../font-awesome-icons/font-awesome-icons.module';

describe('ColoredTrendLabelComponent', () => {
  let component: ColoredTrendLabelComponent;
  let fixture: ComponentFixture<ColoredTrendLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoredTrendLabelComponent ],
      imports: [FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredTrendLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
