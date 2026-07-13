import {Component, computed, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BackupDatabaseInfo} from '../../model/backup-database-info';
import {CommonTableComponent, CommonTableConfig} from '../../core/table/common-table-component';
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
  private backupDatabaseRepository = inject(BACKUP_DATABASE_CRUD_REPOSITORY)

  loadingSignal = computed(() => this.readRepository.loadingSignal() || this.backupDatabaseRepository.loadingSignal());

  constructor() {
    super(inject(BACKUP_INFO_READ_REPOSITORY));
    // Don't auto-load on open: the backup info is fetched once by the always-present
    // header backup button and shared via the root-provided repository's signal, so
    // this page reuses the cached value (and post-backup refreshes) with no REST call
    // of its own.
    this.config = new CommonTableConfig(false);
  }

  backupDatabaseClick(): void {
    this.backupDatabaseRepository.postFormData();
  }
}
