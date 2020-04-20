import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMoreMenuComponent } from './drop-down-more-menu.component';

describe('DropDownMoreMenuComponent', () => {
  let component: DropDownMoreMenuComponent;
  let fixture: ComponentFixture<DropDownMoreMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownMoreMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
