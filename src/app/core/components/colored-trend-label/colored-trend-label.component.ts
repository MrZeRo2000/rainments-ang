import {Component, input} from '@angular/core';
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-core-colored-trend-label',
  templateUrl: './colored-trend-label.component.html',
  imports: [
    NgClass,
    FaIconComponent
  ],
  styleUrls: ['./colored-trend-label.component.scss']
})
export class ColoredTrendLabelComponent {
  value = input<any>();
}
