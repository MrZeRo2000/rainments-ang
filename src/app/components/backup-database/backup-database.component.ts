import {Component, computed, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {DatePipe} from '@angular/common';
import {MessagesService} from '../../messages/messages.service';
import {SuccessMessage} from '../../messages/message.model';
import {BackupDatabaseInfo} from '../../model/backup-database-info';
import {CommonTableComponent} from '../../core/table/common-table-component';
import {CrudStatus} from '../../core/repository/crud-repository';
import {MatButtonModule} from '@angular/material/button';
import {LoadingProgressComponent} from '../../core/components/loading-progress/loading-progress.component';
import {BACKUP_DATABASE_CRUD_REPOSITORY, BACKUP_INFO_READ_REPOSITORY} from '../../repository/repository-tokens';

@Component({
  selector: 'app-backup-database',
  templateUrl: './backup-database.component.html',
  imports: [
    DatePipe,
    MatButtonModule,
    LoadingProgressComponent
  ],
  styleUrls: ['./backup-database.component.scss']
})
export class BackupDatabaseComponent extends CommonTableComponent<BackupDatabaseInfo> {
  private messagesService = inject(MessagesService)
  private backupDatabaseRepository = inject(BACKUP_DATABASE_CRUD_REPOSITORY)

  messageSource = input<string>();

  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.backupDatabaseRepository.loadingSignal());

  // Activates the CRUD stream: on success, report the message and refresh the info.
  private backupResult = toSignal(this.backupDatabaseRepository.crudAction$.pipe(
    tap(result => {
      if (result.status === CrudStatus.Success) {
        this.messagesService.reportMessage(
          new SuccessMessage(`Backup successful: ${result.data?.message}`, this.messageSource()));
        this.loadRepositoryData();
      }
    })
  ));

  constructor() {
    super(inject(BACKUP_INFO_READ_REPOSITORY));
  }

  backupDatabaseClick(): void {
    this.backupDatabaseRepository.postFormData();
  }
}
