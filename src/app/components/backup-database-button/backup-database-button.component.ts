import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {CrudStatus} from "../../core/repository/crud-repository";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BACKUP_DATABASE_CRUD_REPOSITORY} from "../../repository/repository-tokens";

declare var bootstrap: any;

@Component({
  selector: 'app-backup-database-button',
  templateUrl: './backup-database-button.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./backup-database-button.component.scss']
})
export class BackupDatabaseButtonComponent {
  public backupDatabaseRepository = inject(BACKUP_DATABASE_CRUD_REPOSITORY)

  private toast = viewChild<ElementRef>('liveToast');

  backupMessage = signal('');

  // Activates the CRUD stream and shows a toast on each successful backup.
  private backupResult = toSignal(this.backupDatabaseRepository.crudAction$.pipe(
    tap(result => {
      if (result.status === CrudStatus.Success) {
        this.backupMessage.set(result.data?.message ?? '');
        const element = this.toast()?.nativeElement;
        if (element) {
          bootstrap.Toast.getOrCreateInstance(element).show();
        }
      }
    })
  ));

  onClick() {
    this.backupDatabaseRepository.postFormData();
  }
}
