import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-core-previous-metric-label',
  templateUrl: './previous-metric-label.component.html',
  styleUrls: ['./previous-metric-label.component.scss']
})
export class PreviousMetricLabelComponent implements OnInit {
  @Input()
  metricValue: any;

  constructor() { }

  ngOnInit(): void {
  }

}
