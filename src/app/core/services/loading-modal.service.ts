import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {LoadingModalPanelComponent} from '../components/loading-modal-panel/loading-modal-panel.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingModalService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  public show(): void {
    this.bsModalRef = this.modalService.show(LoadingModalPanelComponent,
      {class: 'modal-dialog modal-sm modal-dialog-centered', backdrop: 'static', animated: true});
  }

  public hide(): void {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
    }
  }
}
