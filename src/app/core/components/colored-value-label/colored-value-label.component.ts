import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

export enum ColorScheme {
  NONE,
  POS_GREEN_NEG_RED
}

@Component({
  selector: 'app-core-colored-value-label',
  templateUrl: './colored-value-label.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./colored-value-label.component.scss']
})
export class ColoredValueLabelComponent {
  @Input()
  value: any;

  @Input()
  displayZero: boolean;

  @Input()
  colorScheme: ColorScheme;

  colorSchemeType = ColorScheme;

  constructor() { }
}
