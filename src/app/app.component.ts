import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInfoComponent } from './components/app-info/app-info.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { BackupDatabaseButtonComponent } from './components/backup-database-button/backup-database-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    AppInfoComponent,
    NavTopComponent,
    BackupDatabaseButtonComponent
  ]
})
export class AppComponent {
  title = 'Rainments';

  constructor() { }
}
