import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Editable} from '../../edit/edit-intf';

@Component({
  selector: 'app-core-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.scss']
})
export class AddPanelComponent implements OnInit {

  @Input() editable: Editable;
  @Output() addClick: EventEmitter<any>;

  constructor() {
    this.addClick = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  onClick(): void {
    this.addClick.emit();
  }
}
