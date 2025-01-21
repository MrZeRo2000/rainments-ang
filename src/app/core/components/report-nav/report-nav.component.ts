import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-report-nav',
    templateUrl: './report-nav.component.html',
    styleUrls: ['./report-nav.component.scss'],
    standalone: false
})
export class ReportNavComponent implements OnInit {

  @Input()
  itemId: number;

  @Input()
  navigatePath: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onReportClick(event) {
    event.preventDefault();
    this.router.navigateByUrl(`/${this.navigatePath}/${this.itemId}` ).then();
  }
}
