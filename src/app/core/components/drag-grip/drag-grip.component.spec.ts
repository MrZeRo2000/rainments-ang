import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragGripComponent } from './drag-grip.component';

describe('DragGripComponent', () => {
  let component: DragGripComponent;
  let fixture: ComponentFixture<DragGripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragGripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragGripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
