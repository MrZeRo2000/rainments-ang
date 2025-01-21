import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Editable, Loadable} from '../../edit/edit-intf';
import {EditMode} from '../../edit/edit-state';

@Component({
    selector: 'app-core-save-dialog-panel',
    templateUrl: './save-dialog-panel.component.html',
    styleUrls: ['./save-dialog-panel.component.scss'],
    standalone: false
})
export class SaveDialogPanelComponent implements OnInit {
  EditMode = EditMode;

  @Input() editable: Editable;
  @Input() loadable: Loadable;

  @Output() createClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onCreate(): void {
    this.createClick.emit();
  }

  onSave(): void {
    this.saveClick.emit();
  }

  onCancel(): void {
    this.cancelClick.emit();
  }

}
