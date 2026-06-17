import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {Payment} from '../../model/payment';

import * as d3 from 'd3';
import {DateFormatter} from '../../core/utils/date-formatter';
import {PaymentColorsResult, PaymentsColorUtils} from '../../utils/payments-color-utils';
import {
  ChartStyle,
  ReportsChartDateTotalsDisplayOptions
} from '../reports-chart-date-totals-display-options/reports-chart-date-totals-display-options.component';
import {BarChartDrawer, IDrawer, SideBySideBarChartDrawer, StackedBarChartDrawer} from './reports-chart-date-totals-drawers';
import {NgStyle} from "@angular/common";


@Component({
  selector: 'app-reports-chart-date-totals',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reports-chart-date-totals.component.html',
  imports: [
    NgStyle
  ],
  styleUrls: ['./reports-chart-date-totals.component.scss']
})
export class ReportsChartDateTotalsComponent implements AfterViewInit {

  payments = input<Array<Payment>>();

  displayOptions = input<ReportsChartDateTotalsDisplayOptions>();

  paymentColorsResult = computed<PaymentColorsResult | undefined>(() => {
    const payments = this.payments();
    return payments && payments.length > 0 ? PaymentsColorUtils.calcPaymentColorsTotals(payments) : undefined;
  });

  dataWidth = computed(() => this.paymentColorsResult()?.paymentColorsTotals.length * 100);

  drawer: IDrawer;

  private readonly margin: { top: number, bottom: number, left: number; right: number} =
    {top: 20, bottom: 30, left: 60, right: 20};

  private readonly xScale = d3.scaleBand();

  private readonly yScale: d3.ScaleLinear<number, number> = d3.scaleLinear();

  private chartContainer = viewChild<ElementRef>('chart');

  private tooltip = viewChild<ElementRef>('tooltip');

  private container = viewChild<ElementRef>('container');

  // Top level SVG element
  svg;
  // content group
  contentGroup;
  // SVG Group element
  g;

  private containerWidth: number;

  constructor() {
    // Redraw when the data (colors) or chart style changes — once the container is measured.
    effect(() => {
      const colors = this.paymentColorsResult();
      this.displayOptions(); // tracked: a chart-style change should also trigger a redraw
      if (colors && !isNaN(this.innerWidth())) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateContainerWidth();
      setTimeout(() => {
        this.updateChart();
      })
    }, 0);
  }

  private createDrawer(): void {
    const chartStyle = this.displayOptions()?.chartStyle;
    if (chartStyle === ChartStyle.BarChart) {
      this.drawer = new BarChartDrawer(this.paymentColorsResult())
    } else if (chartStyle === ChartStyle.StackedBarChart) {
      this.drawer = new StackedBarChartDrawer(this.paymentColorsResult())
    } else if (chartStyle === ChartStyle.SideBySideBarChart) {
      this.drawer = new SideBySideBarChartDrawer(this.paymentColorsResult())
    } else {
      this.drawer = undefined;
    }
  }

  private updateContainerWidth(): void {
    this.containerWidth = this.chartContainer()?.nativeElement.clientWidth;
  }

  private innerWidth(): number {
    return Math.max(this.containerWidth, this.dataWidth())
      - this.margin.left - this.margin.right;
  }

  private innerHeight(): number {
    return this.chartContainer()?.nativeElement.clientHeight
      - this.margin.top - this.margin.bottom;
  }

  private removeExistingChartElement() {
    d3.select(this.chartContainer()?.nativeElement).selectAll('*').remove();
  }

  private createChartElement() {
    this.svg = d3.select(this.chartContainer()?.nativeElement);
  }

  private setChartDimensions() {
    this.contentGroup = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private createAxes() {
    this.xScale
      .rangeRound([0, this.innerWidth()])
      .domain(this.paymentColorsResult()?.paymentColorsTotals.map(value => DateFormatter.formatDateShortMonthYear(value.periodDate)))
      .padding(0.5);

    this
      .yScale.rangeRound([this.innerHeight(), 0])
      .domain([0, this.drawer?.getMaxY()]);

    this.contentGroup.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    this.contentGroup.append('g')
      .attr('id', 'y-axis')
      .call(d3.axisLeft(this.yScale));
  }

  private createBars() {
    this.drawer?.drawBars(this.contentGroup, this.xScale, this.yScale, this.tooltip()?.nativeElement);
  }

  private createLabels() {
    this.drawer?.drawLabels(this.contentGroup, this.xScale, this.yScale);
  }

  private createChart() {
    this.createChartElement();
    this.setChartDimensions();

    this.createDrawer();

    this.createAxes();

    this.createBars();

    this.createLabels();
  }

  public updateChart() {
    if (!!this.svg) {
      this.removeExistingChartElement();
    }
    if (!!this.paymentColorsResult()) {
      this.createChart();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateContainerWidth();

    const svg = d3.select(this.chartContainer()?.nativeElement);

    this.xScale.rangeRound([0, this.innerWidth()]);
    this.yScale.rangeRound([this.innerHeight(), 0]);

    svg.select<SVGGElement>('#x-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    svg.select<SVGGElement>('#y-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .call(d3.axisLeft(this.yScale));

    this.drawer?.drawTransitionBars(svg, this.xScale, this.yScale);

    this.drawer?.drawTransitionLabels(svg, this.xScale, this.yScale);
  }
}
