import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-drop-down-more-menu',
  templateUrl: './drop-down-more-menu.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./drop-down-more-menu.component.scss']
})
export class DropDownMoreMenuComponent {

  constructor() { }
}
