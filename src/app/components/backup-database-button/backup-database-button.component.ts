import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {BackupDatabaseRepository} from "../../repository/backup-database-repository";
import {Subscription} from "rxjs";

declare var bootstrap: any;

@Component({
  selector: 'app-backup-database-button',
  templateUrl: './backup-database-button.component.html',
  styleUrls: ['./backup-database-button.component.scss']
})
export class BackupDatabaseButtonComponent implements OnDestroy {
  @ViewChild('liveToast', {static: false}) toast: ElementRef;

  private backupSubscription: Subscription;

  backupMessage: string = '';

  constructor(public backupDatabaseRepository: BackupDatabaseRepository) {
    this.backupSubscription = this.backupDatabaseRepository.getPersistData().subscribe(data => {
        this.backupMessage = data.body.message;
        const liveToast = bootstrap.Toast.getOrCreateInstance(this.toast.nativeElement);
        liveToast.show()
      }
    );
  }

  onClick() {
    setTimeout(() => this.backupDatabaseRepository.postBackupRequest(), 0);
  }

  ngOnDestroy(): void {
    this.backupSubscription.unsubscribe();
  }
}
