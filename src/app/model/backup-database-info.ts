export class BackupDatabaseInfo {
  constructor(public lastBackupDateTime: Date, public backupFileCount: number) {
  }
}
