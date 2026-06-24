import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-core-dialog-confirmation',
    templateUrl: './confirmation-modal-dialog.component.html',
    imports: [
      MatDialogModule,
      MatButtonModule,
      MatIconModule
    ],
    styleUrls: ['./confirmation-modal-dialog.component.scss']
})
export class ConfirmationModalDialogComponent {
  // Opened via MatDialog; `message` may contain HTML. Confirm closes the dialog
  // with `true` (mat-dialog-close="true"); the caller acts on afterClosed().
  data = inject<{message: string}>(MAT_DIALOG_DATA);
}
