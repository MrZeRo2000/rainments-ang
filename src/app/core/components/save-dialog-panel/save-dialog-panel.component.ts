import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
import {Editable, Loadable} from '../../edit/edit-intf';
import {EditMode, EditState} from '../../edit/edit-state';

@Component({
    selector: 'app-core-save-dialog-panel',
    templateUrl: './save-dialog-panel.component.html',
    styleUrls: ['./save-dialog-panel.component.scss']
})
export class SaveDialogPanelComponent {
  EditMode = EditMode;

  @Input() editable?: Editable;
  @Input() loadable?: Loadable;
  @Input() loading?: Signal<boolean>;

  @Input() editMode?: EditMode;
  @Input() editStateSignal?: Signal<EditState<any> | undefined>;

  @Output() createClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();

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
