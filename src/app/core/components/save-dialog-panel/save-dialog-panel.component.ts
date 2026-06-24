import {Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {EditMode, EditState} from '../../edit/edit-state';

@Component({
    selector: 'app-core-save-dialog-panel',
    templateUrl: './save-dialog-panel.component.html',
    imports: [
      MatButtonModule
    ],
    styleUrls: ['./save-dialog-panel.component.scss']
})
export class SaveDialogPanelComponent {
  EditMode = EditMode;

  loading = input<boolean>();
  editState = input<EditState<any> | undefined>();

  createClick = output<void>();
  saveClick = output<void>();
  cancelClick = output<void>();

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
