import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-core-drop-down-more-menu',
  templateUrl: './drop-down-more-menu.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  styleUrls: ['./drop-down-more-menu.component.scss']
})
export class DropDownMoreMenuComponent {
}
