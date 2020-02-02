import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
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
