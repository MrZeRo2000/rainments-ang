import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent {
  private router = inject(Router)

  @Input()
  itemId: number;

  @Input()
  navigatePath: string;

  onReportClick(event) {
    event.preventDefault();
    this.router.navigateByUrl(`/${this.navigatePath}/${this.itemId}` ).then();
  }
}
