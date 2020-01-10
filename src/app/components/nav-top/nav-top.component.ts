import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {
  routeUrl = '/';

  getActiveHome(): boolean {
    return this.routeUrl === '/';
  }

  getActiveSettings(): boolean {
    return this.routeUrl === '/settings';
  }

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      event => {this.routeUrl = (event as NavigationEnd).url; }
    );
  }

  ngOnInit() {
  }

}
