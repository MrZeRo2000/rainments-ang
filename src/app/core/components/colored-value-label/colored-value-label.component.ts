import {Component, Input, OnInit} from '@angular/core';

export enum ColorScheme {
  NONE,
  POS_GREEN_NEG_RED
}

@Component({
    selector: 'app-core-colored-value-label',
    templateUrl: './colored-value-label.component.html',
    styleUrls: ['./colored-value-label.component.scss'],
    standalone: false
})
export class ColoredValueLabelComponent implements OnInit {
  @Input()
  value: any;

  @Input()
  displayZero: boolean;

  @Input()
  colorScheme: ColorScheme;

  colorSchemeType = ColorScheme;

  constructor() { }

  ngOnInit(): void {
  }

}
