import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';

import * as d3 from 'd3';
import {DateFormatter} from '../../core/utils/date-formatter';

@Component({
  selector: 'app-reports-chart-date-totals',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reports-chart-date-totals.component.html',
  styleUrls: ['./reports-chart-date-totals.component.scss']
})
export class ReportsChartDateTotalsComponent implements OnInit, OnChanges {

  @Input()
  payments: Array<Payment>;

  paymentsDateTotals: Array<Payment> = []

  private readonly margin: { top: number, bottom: number, left: number; right: number} =
    {top: 20, bottom: 30, left: 30, right: 20};

  // private readonly xScale: d3.ScaleLinear<number, number, never> = d3.scaleLinear();
  private readonly xScale = d3.scaleBand();

  private readonly yScale: d3.ScaleLinear<number, number, never> = d3.scaleLinear();

  @ViewChild('chart', { static: true})
  private chartContainer?: ElementRef;

  // Top level SVG element
  svg;
  // content group
  contentGroup;
  // SVG Group element
  g;

  constructor() { }

  ngOnInit(): void {
    // this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName === 'payments') {
        const changedProp = changes[propName];
        if (changedProp.currentValue && changedProp.currentValue.length  > 0) {
          this.paymentsDateTotals = PaymentUtils.groupBy(changedProp.currentValue, ['periodDate'])
          this.updateChart();
        }
      }
    }
  }

  private innerWidth(): number {
    return Math.max(this.chartContainer?.nativeElement.clientWidth, this.dataWidth())
      - this.margin.left - this.margin.right;
  }

  private innerHeight(): number {
    return this.chartContainer?.nativeElement.clientHeight
      - this.margin.top - this.margin.bottom;
  }

  dataWidth(): number {
    return this.paymentsDateTotals?.length * 100;
  }

  private removeExistingChartElement() {
    d3.select(this.chartContainer?.nativeElement).selectAll('*').remove();
  }

  private createChartElement() {
    this.svg = d3.select(this.chartContainer?.nativeElement);
  }

  private setChartDimensions() {
    this.contentGroup = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private createAxes() {
    this.xScale
      .rangeRound([0, this.innerWidth()])
      .domain(this.paymentsDateTotals.map(value => DateFormatter.formatDateShortMonthYear(value.periodDate)))
      .padding(0.5);

    this
      .yScale.rangeRound([this.innerHeight(), 0])
      .domain([0, d3.max(this.paymentsDateTotals, d => d.paymentAmount) as number]);

    this.contentGroup.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    this.contentGroup.append('g')
      .attr('id', 'y-axis')
      .call(d3.axisLeft(this.yScale));
  }

  private createBars() {
    this.contentGroup.append('g')
      .attr('id', 'bar')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(this.paymentsDateTotals)
      .join('rect')
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)))
      .attr('y', d => this.yScale(d.paymentAmount))
      .attr('height', d => this.yScale(0) - this.yScale(d.paymentAmount))
      .attr('width', this.xScale.bandwidth());
  }

  private createChart() {
    this.createChartElement();

    this.setChartDimensions();

    this.createAxes();

    this.createBars();
  }

  private processData() {

  }

  private updateAreaCharts() {

  }

  public updateChart() {
    if (!!this.svg) {
      this.removeExistingChartElement();
    }
    this.createChart();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const svg = d3.select(this.chartContainer?.nativeElement);
    // this.setMinWidth();
    // this.chartContainer?.nativeElement.style.minWidth = 1000;

    this.xScale.rangeRound([0, this.innerWidth()]);
    this.yScale.rangeRound([this.innerHeight(), 0]);

    svg.select<SVGGElement>('#x-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    svg.select<SVGGElement>('#y-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .call(d3.axisLeft(this.yScale));

    svg.selectAll('rect')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear((d as Payment).periodDate)))
      .attr('y', d => this.yScale((d as Payment).paymentAmount))
      .attr('height', d => this.yScale(0) - this.yScale((d as Payment).paymentAmount))
      .attr('width', this.xScale.bandwidth());
  }
}
