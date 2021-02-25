import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMultiSelectComponent } from './drop-down-multi-select.component';

describe('DropDownMultiSelectComponent', () => {
  let component: DropDownMultiSelectComponent;
  let fixture: ComponentFixture<DropDownMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
