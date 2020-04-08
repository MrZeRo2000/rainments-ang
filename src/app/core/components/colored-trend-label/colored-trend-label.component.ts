import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-core-colored-trend-label',
  templateUrl: './colored-trend-label.component.html',
  styleUrls: ['./colored-trend-label.component.scss']
})
export class ColoredTrendLabelComponent implements OnInit {
  @Input()
  value: any;

  constructor() { }

  ngOnInit(): void {
  }

}
