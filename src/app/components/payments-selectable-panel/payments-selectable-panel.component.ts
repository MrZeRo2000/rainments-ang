import { Component } from '@angular/core';
import {CoreSelectablePanelComponent} from '../../core/components/core-selectable-panel/core-selectable-panel.component';
import {Payment} from '../../model/payment';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-payments-selectable-panel',
  templateUrl: './payments-selectable-panel.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  styleUrls: ['./payments-selectable-panel.component.scss']
})
export class PaymentsSelectablePanelComponent extends CoreSelectablePanelComponent<Payment> {

}
