import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalDialogComponent } from './confirmation-modal-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogConfirmationComponent', () => {
  let component: ConfirmationModalDialogComponent;
  let fixture: ComponentFixture<ConfirmationModalDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { message: 'test' } },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
