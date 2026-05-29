import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Editable} from '../../edit/edit-intf';
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

  @Input() editable: Editable;
  @Output() addClick: EventEmitter<any>;

  constructor() {
    this.addClick = new EventEmitter<any>();
  }

  onClick(): void {
    this.addClick.emit();
  }
}
