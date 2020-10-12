import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMoreMenuComponent } from './drop-down-more-menu.component';
import {FontAwesomeIconsModule} from '../../../font-awesome-icons/font-awesome-icons.module';

describe('DropDownMoreMenuComponent', () => {
  let component: DropDownMoreMenuComponent;
  let fixture: ComponentFixture<DropDownMoreMenuComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownMoreMenuComponent ],
      imports: [FontAwesomeIconsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
