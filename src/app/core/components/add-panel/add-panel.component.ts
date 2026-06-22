import {Component, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-core-add-panel',
  templateUrl: './add-panel.component.html',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./add-panel.component.scss']
})
export class AddPanelComponent {

  addClick = output<void>();

  onClick(): void {
    this.addClick.emit();
  }
}
