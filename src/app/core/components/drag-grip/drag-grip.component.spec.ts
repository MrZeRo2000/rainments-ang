import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragGripComponent } from './drag-grip.component';

describe('DragGripComponent', () => {
  let component: DragGripComponent;
  let fixture: ComponentFixture<DragGripComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [DragGripComponent]
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
