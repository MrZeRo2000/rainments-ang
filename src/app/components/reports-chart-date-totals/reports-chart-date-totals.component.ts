import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Payment} from '../../model/payment';
import {PaymentUtils} from '../../utils/payment-utils';

import * as d3 from 'd3';
import {DateFormatter} from '../../core/utils/date-formatter';
import {AmountPipe} from '../../core/pipes/amount.pipe';
import {PaymentColorsResult, PaymentColorsTotal, PaymentsColorUtils} from '../../utils/payments-color-utils';

@Component({
  selector: 'app-reports-chart-date-totals',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reports-chart-date-totals.component.html',
  styleUrls: ['./reports-chart-date-totals.component.scss']
})
export class ReportsChartDateTotalsComponent implements OnChanges, AfterViewInit {

  @Input()
  payments: Array<Payment>;

  paymentColorsResult: PaymentColorsResult;

  private readonly margin: { top: number, bottom: number, left: number; right: number} =
    {top: 20, bottom: 30, left: 60, right: 20};

  // private readonly xScale: d3.ScaleLinear<number, number, never> = d3.scaleLinear();
  private readonly xScale = d3.scaleBand();

  private readonly yScale: d3.ScaleLinear<number, number, never> = d3.scaleLinear();

  @ViewChild('chart', { static: true})
  private chartContainer?: ElementRef;

  @ViewChild('container', { static: true})
  private container?: ElementRef;

  // Top level SVG element
  svg;
  // content group
  contentGroup;
  // SVG Group element
  g;

  private readonly amountPipe: AmountPipe = new AmountPipe();

  private containerWidth: number;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('ngAfterViewInit chart container:' + JSON.stringify(this.chartContainer.nativeElement.clientWidth));
      this.updateContainerWidth();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      if (propName === 'payments') {
        const changedProp = changes[propName];
        if (changedProp.currentValue && changedProp.currentValue.length  > 0) {
          this.paymentColorsResult = PaymentsColorUtils.calcPaymentColorsTotals(changedProp.currentValue);
          if (!isNaN(this.innerWidth())) {
            console.log(`Updating chart with (${this.innerWidth()}, ${this.innerHeight()}), clientWidth=${this.chartContainer?.nativeElement.clientWidth}, dataWidth=${this.dataWidth()}`);
            this.updateChart();
          }
        }
      }
    }
  }

  private updateContainerWidth(): void {
    this.containerWidth = this.chartContainer?.nativeElement.clientWidth;
  }

  private innerWidth(): number {
    return Math.max(this.containerWidth, this.dataWidth())
      - this.margin.left - this.margin.right;
  }

  private innerHeight(): number {
    return this.chartContainer?.nativeElement.clientHeight
      - this.margin.top - this.margin.bottom;
  }

  dataWidth(): number {
    return this.paymentColorsResult?.paymentColorsTotals.length * 100;
  }

  componentContainerWidth(): number {
    return window.innerWidth - this.container?.nativeElement.offsetLeft - (window.outerWidth - window.innerWidth) - 10;
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
      .domain(this.paymentColorsResult?.paymentColorsTotals.map(value => DateFormatter.formatDateShortMonthYear(value.periodDate)))
      .padding(0.5);

    this
      .yScale.rangeRound([this.innerHeight(), 0])
      .domain([0, d3.max(this.paymentColorsResult?.paymentColorsTotals, d => d.amount) as number]);

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
      .data(this.paymentColorsResult?.paymentColorsTotals)
      .join('rect')
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)))
      .attr('y', d => this.yScale(d.amount))
      .attr('height', d => this.yScale(0) - this.yScale(d.amount))
      .attr('width', this.xScale.bandwidth());
  }

  private createLabels() {
    this.contentGroup.append('g')
      .attr('id', 'labels')
      .selectAll('text')
      .data(this.paymentColorsResult?.paymentColorsTotals)
      .enter()
      .append('text')
      .text(d => d.amount > 0 ? this.amountPipe.transform(d.amount) : null)
      .attr('text-anchor', 'middle')
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)) + this.xScale.bandwidth() / 2)
      .attr('y', d => this.yScale(d.amount) + 15)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white')
    ;

  }

  private createChart() {
    this.createChartElement();

    this.setChartDimensions();

    this.createAxes();

    this.createBars();

    this.createLabels();
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
    console.log('Resize:' + window.innerWidth);
    console.log(`Container:${this.container.nativeElement.offsetLeft}`)

    this.updateContainerWidth();

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
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)))
      .attr('y', d => this.yScale((d as PaymentColorsTotal).amount))
      .attr('height', d => this.yScale(0) - this.yScale((d as PaymentColorsTotal).amount))
      .attr('width', this.xScale.bandwidth());

    svg.select<SVGGElement>('#labels').selectAll('text')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('x', d => this.xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)) + this.xScale.bandwidth() / 2)
      .attr('y', d => this.yScale((d as PaymentColorsTotal).amount) + 15);
  }
}
