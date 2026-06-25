import {Component, input} from '@angular/core';

export enum ColorScheme {
  NONE,
  POS_GREEN_NEG_RED
}

@Component({
  selector: 'app-core-colored-value-label',
  templateUrl: './colored-value-label.component.html',
  styleUrls: ['./colored-value-label.component.scss']
})
export class ColoredValueLabelComponent {
  value = input<any>();

  displayZero = input<boolean>();

  colorScheme = input<ColorScheme>();

  colorSchemeType = ColorScheme;
}
