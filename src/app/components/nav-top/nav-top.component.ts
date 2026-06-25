import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    imports: [
      RouterLink,
      RouterLinkActive,
      MatToolbarModule,
      MatButtonModule
    ],
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent {
}
