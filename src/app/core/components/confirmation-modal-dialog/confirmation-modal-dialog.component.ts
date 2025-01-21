import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-core-dialog-confirmation',
    templateUrl: './confirmation-modal-dialog.component.html',
    styleUrls: ['./confirmation-modal-dialog.component.scss'],
    standalone: false
})
export class ConfirmationModalDialogComponent implements OnInit {
  message: string;
  item: any;
  result: Subject<any>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  onConfirmClick(): void {
    this.bsModalRef.hide();
    this.result.next(this.item);
  }

}
