import {Component, output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-add-panel',
  templateUrl: './add-panel.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./add-panel.component.scss']
})
export class AddPanelComponent {

  addClick = output<void>();

  onClick(): void {
    this.addClick.emit();
  }
}
