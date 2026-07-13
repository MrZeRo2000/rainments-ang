import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {DateFormatter} from "../../core/utils/date-formatter";
import {CrudStatus} from "../../core/repository/crud-repository";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MessagesService} from "../../messages/messages.service";
import {SuccessMessage} from "../../messages/message.model";
import {BACKUP_DATABASE_CRUD_REPOSITORY, BACKUP_INFO_READ_REPOSITORY} from "../../repository/repository-tokens";

@Component({
  selector: 'app-backup-database-button',
  templateUrl: './backup-database-button.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  styleUrls: ['./backup-database-button.component.scss']
})
export class BackupDatabaseButtonComponent {
  public backupDatabaseRepository = inject(BACKUP_DATABASE_CRUD_REPOSITORY)
  private backupInfoRepository = inject(BACKUP_INFO_READ_REPOSITORY)
  private messagesService = inject(MessagesService)

  // Last-backup info shown in the tooltip. It's read from the shared, root-provided
  // BACKUP_INFO_READ_REPOSITORY so this button and the data-management page render the
  // same cached value: the info is fetched once (loadDataOnce in the constructor) and
  // only re-fetched after a backup runs — never once-per-observer.
  backupTooltip = computed(() => {
    const info = this.backupInfoRepository.dataSignal()[0];
    if (info?.lastBackupDateTime) {
      return `Last backup: ${DateFormatter.formatLocaleDateTime(new Date(info.lastBackupDateTime))}`;
    }
    return 'No backup available';
  });

  // Activates the CRUD stream and reports a snackbar on each successful backup.
  // (This button is always present in the header, so it's the reliable place to
  // surface backup feedback and to refresh the shared backup info.)
  private backupResult = toSignal(this.backupDatabaseRepository.crudAction$.pipe(
    tap(result => {
      if (result.status === CrudStatus.Success) {
        this.messagesService.reportMessage(new SuccessMessage(`Backup successful: ${result.data?.message ?? ''}`));
        // Force a refresh so the tooltip (and the page) reflect the new backup.
        this.backupInfoRepository.loadData();
      }
    })
  ));

  constructor() {
    // Fetch the backup info once at startup (this button is created a single time, at
    // app bootstrap). The value is cached in the shared repository's signal and reused
    // by the data-management page, so no observer issues its own REST call.
    this.backupInfoRepository.loadData();
  }

  onClick() {
    this.backupDatabaseRepository.postFormData();
  }
}
