import {Component, computed, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {BackupDatabaseInfo} from '../../model/backup-database-info';
import {CommonTableComponent} from '../../core/table/common-table-component';
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
  }

  override ngOnInit(): void {
    // Reuse the cached backup info shared via the root-provided read repository
    // (first fetched by the always-present header backup button); a no-op with no
    // REST call once loaded. The header button also owns refreshing the shared
    // value after a backup, so this page updates reactively via the shared signal.
    this.readRepository.loadDataOnce();
  }

  backupDatabaseClick(): void {
    this.backupDatabaseRepository.postFormData();
  }
}
