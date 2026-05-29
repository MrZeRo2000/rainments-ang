import { Component } from '@angular/core';
import {CoreSelectablePanelComponent} from '../../core/components/core-selectable-panel/core-selectable-panel.component';
import {Payment} from '../../model/payment';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-payments-selectable-panel',
  templateUrl: './payments-selectable-panel.component.html',
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./payments-selectable-panel.component.scss']
})
export class PaymentsSelectablePanelComponent extends CoreSelectablePanelComponent<Payment> {

}
