import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from '../../messages/messages.service';
import {BackupInfoRepository} from '../../repository/backup-info-repository';
import {Loadable} from '../../core/edit/edit-intf';
import {BackupDatabaseRepository} from '../../repository/backup-database-repository';
import {BackupDatabaseInfo} from '../../model/backup-database-info';
import {SuccessMessage} from '../../messages/message.model';
import {Subscription} from 'rxjs';
import {DatePipe} from "@angular/common";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";

@Component({
  selector: 'app-backup-database',
  templateUrl: './backup-database.component.html',
  imports: [
    DatePipe,
    LoadingProgressComponent
  ],
  styleUrls: ['./backup-database.component.scss']
})
export class BackupDatabaseComponent implements OnInit, OnDestroy, Loadable {
  public messagesService = inject(MessagesService)
  public backupInfoRepository = inject(BackupInfoRepository)
  public backupDatabaseRepository = inject(BackupDatabaseRepository)

  @Input()
  messageSource: string;

  backupLoading = false;

  private backupSubscription: Subscription;
  private loadingSubscription: Subscription;

  ngOnInit(): void {
    this.backupInfoRepository.loadData();
    this.backupSubscription = this.backupDatabaseRepository.getPersistData().subscribe(data => {
      this.messagesService.reportMessage(new SuccessMessage(`Backup successful: ${data.body.message}`, this.messageSource));
      this.backupInfoRepository.loadData(null, {updateMessages: false, messageSource: this.messageSource});
    }
    );
    this.loadingSubscription = this.backupDatabaseRepository.getLoadingState().subscribe(value => {
      this.backupLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.backupSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
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
