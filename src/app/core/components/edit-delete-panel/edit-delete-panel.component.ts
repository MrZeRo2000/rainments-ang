import {Component, input, output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-edit-delete-panel',
  templateUrl: './edit-delete-panel.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./edit-delete-panel.component.scss']
})
export class EditDeletePanelComponent {

  item = input<any>();

  deleteClick = output<any>();
  editClick = output<any>();

  onDeleteClick(item): void {
    this.deleteClick.emit(item);
  }

  onEditClick(item): void {
    this.editClick.emit(item);
  }

}
