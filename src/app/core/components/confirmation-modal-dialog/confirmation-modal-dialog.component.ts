import {Component, inject} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-core-dialog-confirmation',
    templateUrl: './confirmation-modal-dialog.component.html',
    styleUrls: ['./confirmation-modal-dialog.component.scss']
})
export class ConfirmationModalDialogComponent {
  public bsModalRef = inject(BsModalRef)

  message: string;
  item: any;
  result: Subject<any>;

  constructor() {}

  onConfirmClick(): void {
    this.bsModalRef.hide();
    this.result.next(this.item);
  }

}
