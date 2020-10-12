import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragGripComponent } from './drag-grip.component';
import {FontAwesomeIconsModule} from '../../../font-awesome-icons/font-awesome-icons.module';

describe('DragGripComponent', () => {
  let component: DragGripComponent;
  let fixture: ComponentFixture<DragGripComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ DragGripComponent ],
      imports: [FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragGripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
