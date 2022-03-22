import { Component, OnInit } from '@angular/core';
import {CoreSelectablePanelComponent} from '../../core/components/core-selectable-panel/core-selectable-panel.component';
import {Payment} from '../../model/payment';

@Component({
  selector: 'app-payments-selectable-panel',
  templateUrl: './payments-selectable-panel.component.html',
  styleUrls: ['./payments-selectable-panel.component.scss']
})
export class PaymentsSelectablePanelComponent extends CoreSelectablePanelComponent<Payment> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
