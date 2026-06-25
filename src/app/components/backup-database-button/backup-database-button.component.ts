import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {CrudStatus} from "../../core/repository/crud-repository";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MessagesService} from "../../messages/messages.service";
import {SuccessMessage} from "../../messages/message.model";
import {BACKUP_DATABASE_CRUD_REPOSITORY} from "../../repository/repository-tokens";

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
  private messagesService = inject(MessagesService)

  // Activates the CRUD stream and reports a snackbar on each successful backup.
  // (This button is always present in the header, so it's the reliable place to
  // surface backup feedback.)
  private backupResult = toSignal(this.backupDatabaseRepository.crudAction$.pipe(
    tap(result => {
      if (result.status === CrudStatus.Success) {
        this.messagesService.reportMessage(new SuccessMessage(`Backup successful: ${result.data?.message ?? ''}`));
      }
    })
  ));

  onClick() {
    this.backupDatabaseRepository.postFormData();
  }
}
