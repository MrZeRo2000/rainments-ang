import { Component, OnInit } from '@angular/core';
import {CommonSimpleTableComponent} from '../../core/table/common-simple-table-component';
import {DateTime} from '../../model/date-time';
import {MessagesService} from '../../messages/messages.service';
import {BackupInfoRepository} from '../../repository/backup-info-repository';
import {Loadable} from '../../core/edit/edit-intf';
import {BackupDatabaseRepository} from '../../repository/backup-database-repository';

@Component({
  selector: 'app-backup-database',
  templateUrl: './backup-database.component.html',
  styleUrls: ['./backup-database.component.scss']
})
export class BackupDatabaseComponent implements OnInit, Loadable {
  constructor(
    public messagesService: MessagesService,
    public backupInfoRepository: BackupInfoRepository,
    public backupDatabaseRepository: BackupDatabaseRepository
  ) { }

  ngOnInit(): void {
    this.backupInfoRepository.loadData();
  }

  getLoading(): boolean {
    return this.backupInfoRepository.getLoading();
  }
}
