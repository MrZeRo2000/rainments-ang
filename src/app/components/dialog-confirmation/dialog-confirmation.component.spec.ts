import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationComponent } from './dialog-confirmation.component';
import {BsModalRef} from 'ngx-bootstrap';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmationComponent ],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
