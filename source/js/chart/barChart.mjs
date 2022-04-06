/**
 * Todo / improvement
 * - FIX: SVG renders buggy when values are < 0
 * - The SVG doesn't fit exactly, it has margin at the bottom
 * - add ticks
 * - add value axis
 */

import * as d3 from 'd3';

class BarChart {
  constructor(data) {
    const values = data.map((records) => records.relativePL);
    const domain = BarChart.domain(values);
    const viewBox = `${domain[0]} 0 ${Math.abs(domain[0] - domain[1])} 1`;
    
    this.bars = values.map(value => BarChart.singelBar(value, domain, viewBox).node());
    this.svg = d3.create('svg')
      .classed('chart', true)
      .classed('chart-bar', true);
    
    this.bars.forEach(bar => this.svg.node().append(bar));
  }

  static singelBar (value, domain, viewBow) {
    const svg = d3.create('svg')
      .attr('viewBox', viewBow)
      .classed('chart', true)
      .classed('chart-bar-item', true)
      .classed('negative', value < 0);
    const x = d3.scaleLinear()
      .domain(domain)
      .range(BarChart.range(domain))
    const axis = d3.axisBottom(x).ticks(3, ',f');;
    
    svg.append('g')
      .call(axis);
    
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', value)
      .attr('y1', 0)
      .attr('y2', 0)
      .classed('chart-line', true);

    return svg;
  }

  static domain(values) {
    const min = d3.min(values);
    const max = d3.max(values);

    // all values positive: base range on zero and max value
    if (min > 0) return [ 0, max];

    // all values negative: base viewBox on min value and zero
    if (max < 0) return [ min, 0];

    // both negative and postive: use extremes
    return [min, max];
  }

  static range(domain) {
    return domain;
  }
}

export default BarChart;
