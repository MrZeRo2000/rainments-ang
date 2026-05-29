import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs/operators';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    imports: [
      NgClass,
      RouterLink
    ],
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent {
  private router = inject(Router)

  routeUrl = '/';

  getActiveHome(): boolean {
    return this.routeUrl === '/';
  }

  getActiveSettings(): boolean {
    return this.routeUrl === '/settings';
  }

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      event => {this.routeUrl = (event as NavigationEnd).url; }
    );
  }

}
