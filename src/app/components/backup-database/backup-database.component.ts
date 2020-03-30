import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../messages/messages.service';
import {BackupInfoRepository} from '../../repository/backup-info-repository';
import {Loadable} from '../../core/edit/edit-intf';
import {BackupDatabaseRepository} from '../../repository/backup-database-repository';
import {BackupDatabaseInfo} from '../../model/backup-database-info';
import {SuccessMessage} from '../../messages/message.model';

@Component({
  selector: 'app-backup-database',
  templateUrl: './backup-database.component.html',
  styleUrls: ['./backup-database.component.scss']
})
export class BackupDatabaseComponent implements OnInit, Loadable {

  backupLoading = false;

  constructor(
    public messagesService: MessagesService,
    public backupInfoRepository: BackupInfoRepository,
    public backupDatabaseRepository: BackupDatabaseRepository
  ) { }

  ngOnInit(): void {
    this.backupInfoRepository.loadData();
    this.backupDatabaseRepository.getPersistData().subscribe(data => {
      this.messagesService.reportMessage(new SuccessMessage(`Backup successful: ${data.body.message}`));
      this.backupInfoRepository.loadData(null, {updateMessages: false});
    }
    );
    this.backupDatabaseRepository.getLoadingState().subscribe(value => {
      this.backupLoading = value;
    });
  }

  getLoading(): boolean {
    return this.backupInfoRepository.getLoading();
  }

  getBackupInfo(): BackupDatabaseInfo {
    return this.backupInfoRepository &&
      this.backupInfoRepository.getData() &&
      this.backupInfoRepository.getData().length === 1 &&
      this.backupInfoRepository.getData()[0];
  }

  backupDatabaseClick(): void {
    this.backupLoading = true;
    setTimeout(() => this.backupDatabaseRepository.postBackupRequest(), 0);
  }
}
