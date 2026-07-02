import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent {
  itemId = input<number>();

  navigatePath = input<string>();
}
