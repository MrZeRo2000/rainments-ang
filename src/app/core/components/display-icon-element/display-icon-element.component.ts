import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-display-icon-element',
  templateUrl: './display-icon-element.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./display-icon-element.component.scss']
})
export class DisplayIconElementComponent {

  constructor() { }

}
