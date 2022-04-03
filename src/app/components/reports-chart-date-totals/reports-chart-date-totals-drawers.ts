import * as d3 from 'd3';
import {ScaleBand} from 'd3';
import {AmountPipe} from '../../core/pipes/amount.pipe';
import {PaymentColorsResult, PaymentColorsTotal, ColorAmount} from '../../utils/payments-color-utils';
import {DateFormatter} from '../../core/utils/date-formatter';

interface LabelParams {
  yOffset: number,
  color: string
}

export interface IDrawer {
  drawBars(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  drawTransitionBars(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  getLabelParams(): LabelParams;

  drawLabels(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  drawTransitionLabels(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  getMaxY(): number;

  getLabelY(d: PaymentColorsTotal): number;
}

abstract class AbstractBarChartDrawer implements IDrawer {
  protected static readonly amountPipe: AmountPipe = new AmountPipe();

  public constructor(protected data: PaymentColorsResult) {
  }

  abstract drawBars(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  abstract drawTransitionBars(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void;

  abstract getLabelParams(): LabelParams;

  drawLabels(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    content.append('g')
      .attr('id', 'labels')
      .selectAll('text')
      .data(this.data?.paymentColorsTotals)
      .enter()
      .append('text')
      .text(d => d.amount > 0 ? AbstractBarChartDrawer.amountPipe.transform(d.amount) : null)
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(this.getLabelY(d)) + this.getLabelParams().yOffset)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', this.getLabelParams().color)
    ;
  }

  drawTransitionLabels(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    (svg as d3.Selection<any, unknown, null, undefined>)
      .select<SVGGElement>('#labels')
      .selectAll('text')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(this.getLabelY(d as PaymentColorsTotal)) +
        this.getLabelParams().yOffset)
      .attr('fill', this.getLabelParams().color);
  }

  getMaxY(): number {
    return d3.max(this.data?.paymentColorsTotals, d => d.amount) * 1.05 as number;
  }

  getLabelY(d: PaymentColorsTotal): number {
    return d.amount;
  }
}

export class BarChartDrawer extends AbstractBarChartDrawer {
  drawBars(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    content.append('g')
      .attr('id', 'bar')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(this.data?.paymentColorsTotals)
      .join('rect')
      .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)))
      .attr('y', d => yScale(d.amount))
      .attr('height', d => yScale(0) - yScale(d.amount))
      .attr('width', xScale.bandwidth())
      ;
  }

  drawTransitionBars(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    svg.selectAll('rect')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)))
      .attr('y', d => yScale((d as PaymentColorsTotal).amount))
      .attr('height', d => yScale(0) - yScale((d as PaymentColorsTotal).amount))
      .attr('width', xScale.bandwidth());
  }

  getLabelParams(): LabelParams {
    return {
      yOffset: 15,
      color: 'white'
    };
  };
}

export class StackedBarChartDrawer extends AbstractBarChartDrawer {
  drawBars(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    this.data?.colors.forEach((color, color_index) => {
      content.append('g')
        .attr('id', `bar${color_index}`)
        .attr('fill', color || 'white')
        .attr('stroke', color || 'black')
        .attr('stroke-width', '.1')
        .attr('shape-rendering', 'crispEdges')
        .selectAll('rect')
        .data(this.data?.paymentColorsTotals)
        .join('rect')
        .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)))
        .attr('y', d => yScale(d.colorAmounts[color_index].nextAmount))
        .attr('height', d => yScale(color_index == 0 ? 0 : -2) - yScale(d.colorAmounts[color_index].amount))
        .attr('width', xScale.bandwidth());
    });
  }

  drawTransitionBars(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    this.data?.colors.forEach((color, color_index) => {
      svg.select(`#bar${color_index}`)
        .selectAll('rect')
        .transition().ease(d3.easePolyInOut).duration(500)
        .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)))
        .attr('width', xScale.bandwidth())
        .attr('y', d => yScale((d as PaymentColorsTotal).colorAmounts[color_index].nextAmount))
        .attr('height', d => yScale(color_index == 0 ? 0 : -2) - yScale((d as PaymentColorsTotal).colorAmounts[color_index].amount))
      ;
    });
  }

  getLabelParams(): LabelParams {
    return {
      yOffset: -5,
      color: 'black'
    };
  };
}

export class SideBySideBarChartDrawer extends AbstractBarChartDrawer {
  drawBars(content: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    const barWidth = xScale.bandwidth() / this.data.colors.length;

    this.data?.colors.forEach((color, color_index) => {
      content.append('g')
        .attr('id', `bar${color_index}`)
        .attr('fill', color || 'white')
        .attr('stroke', color || 'black')
        .attr('stroke-width', '.1')
        .attr('shape-rendering', 'crispEdges')
        .selectAll('rect')
        .data(this.data?.paymentColorsTotals)
        .join('rect')
        .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear(d.periodDate)) + color_index * barWidth)
        .attr('y', d => yScale(d.colorAmounts[color_index].amount))
        .attr('height', d => yScale(0) - yScale(d.colorAmounts[color_index].amount))
        .attr('width', barWidth)
      ;
    });
  }

  drawTransitionBars(svg: any, xScale: ScaleBand<any>, yScale: d3.ScaleLinear<number, number>): void {
    const barWidth = xScale.bandwidth() / this.data.colors.length;

    this.data?.colors.forEach((color, color_index) => {
      svg.select(`#bar${color_index}`)
        .selectAll('rect')
        .transition().ease(d3.easePolyInOut).duration(500)
        .attr('x', d => xScale(DateFormatter.formatDateShortMonthYear((d as PaymentColorsTotal).periodDate)) + color_index * barWidth)
        .attr('width', barWidth)
        .attr('y', d => yScale((d as PaymentColorsTotal).colorAmounts[color_index].amount))
        .attr('height', d => yScale(0) - yScale((d as PaymentColorsTotal).colorAmounts[color_index].amount))
      ;
    });
  }

  getLabelParams(): LabelParams {
    return {
      yOffset: -5,
      color: 'black'
    };
  }

  getMaxY(): number {
    return d3.max([].concat(...this.data.paymentColorsTotals.map(v => v.colorAmounts.map(v => v.amount))));
  }

  getLabelY(d: PaymentColorsTotal): number {
    return d3.max((d.colorAmounts as Array<ColorAmount>).map(v => v.amount));
  }
}
