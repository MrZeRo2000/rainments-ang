import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-drag-grip',
  templateUrl: './drag-grip.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./drag-grip.component.scss']
})
export class DragGripComponent {

  constructor() { }
}
