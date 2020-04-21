import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalDialogComponent } from './confirmation-modal-dialog.component';
import {BsModalRef} from 'ngx-bootstrap/modal';

describe('DialogConfirmationComponent', () => {
  let component: ConfirmationModalDialogComponent;
  let fixture: ComponentFixture<ConfirmationModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalDialogComponent ],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
