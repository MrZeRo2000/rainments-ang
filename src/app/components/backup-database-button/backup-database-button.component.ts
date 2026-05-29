import {Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {BackupDatabaseRepository} from "../../repository/backup-database-repository";
import {Subscription} from "rxjs";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

declare var bootstrap: any;

@Component({
  selector: 'app-backup-database-button',
  templateUrl: './backup-database-button.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./backup-database-button.component.scss']
})
export class BackupDatabaseButtonComponent implements OnDestroy {
  public backupDatabaseRepository = inject(BackupDatabaseRepository)

  @ViewChild('liveToast', {static: false}) toast: ElementRef;

  private backupSubscription: Subscription;

  backupMessage: string = '';

  constructor() {
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
