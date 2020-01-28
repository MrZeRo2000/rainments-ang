import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeletePanelComponent } from './edit-delete-panel.component';

describe('EditDeletePanelComponent', () => {
  let component: EditDeletePanelComponent;
  let fixture: ComponentFixture<EditDeletePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeletePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeletePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
