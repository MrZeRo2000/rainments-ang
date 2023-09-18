import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDatabaseButtonComponent } from './backup-database-button.component';

describe('BackupDatabaseButtonComponent', () => {
  let component: BackupDatabaseButtonComponent;
  let fixture: ComponentFixture<BackupDatabaseButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackupDatabaseButtonComponent]
    });
    fixture = TestBed.createComponent(BackupDatabaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
