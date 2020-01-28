import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-core-edit-delete-panel',
  templateUrl: './edit-delete-panel.component.html',
  styleUrls: ['./edit-delete-panel.component.css']
})
export class EditDeletePanelComponent implements OnInit {

  @Input() item: any;

  @Output() deleteClick: EventEmitter<any>;
  @Output() editClick: EventEmitter<any>;

  constructor() {
    this.deleteClick = new EventEmitter<any>();
    this.editClick = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  onDeleteClick(item): void {
    this.deleteClick.emit(item);
  }

  onEditClick(item): void {
    this.editClick.emit(item);
  }

}
