import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Input() item: any;

  @Output() deleteClick: EventEmitter<any>;
  @Output() editClick: EventEmitter<any>;

  constructor() {
    this.deleteClick = new EventEmitter<any>();
    this.editClick = new EventEmitter<any>();
  }

  onDeleteClick(item): void {
    this.deleteClick.emit(item);
  }

  onEditClick(item): void {
    this.editClick.emit(item);
  }

}
