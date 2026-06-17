import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    imports: [
      RouterLink,
      RouterLinkActive
    ],
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent {
}
