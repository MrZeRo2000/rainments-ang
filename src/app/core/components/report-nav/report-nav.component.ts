import {Component, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  imports: [
    MatIconModule
  ],
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent {
  private router = inject(Router)

  itemId = input<number>();

  navigatePath = input<string>();

  onReportClick(event) {
    event.preventDefault();
    this.router.navigateByUrl(`/${this.navigatePath()}/${this.itemId()}` ).then();
  }
}
