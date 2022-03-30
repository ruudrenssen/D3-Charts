/**
 * Todo / improvement
 * - FIX: SVG renders buggy when values are < 0 (do viebow correction before returning the node: all values *10 while not all values are >1); apparently brwopsers can't deal with 0.0001
 * - The SVG doesn't fit exactly, it has margin at the bottom
 */

import * as d3 from "d3"; 

class BarChart {
    static STEPS = 5;

    constructor(data) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        
        this.bars = data.map(value => {
            return BarChart.bar(value, BarChart.viewBox(min, max));
        });
    }

    static bar(value, viewBox) {
        const svg = d3
            .create('svg')
            .attr('viewBox', viewBox)
            .attr('preserveAspectRatio', 'none')
            .attr('class', 'barChart barChart-single');
        
        // draw axis
        svg.append('line')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', 1)
            .attr('class', 'axis');

        // draw line that represents value
        svg.append('line')
            .attr('x1', 0)
            .attr('x2', value)
            .attr('y1', 0.5)
            .attr('y2', 0.5)
            .attr('class', value < 0 ? 'bar negative' : 'bar');

        return svg.node();
    }

    static viewBox(min, max, height = 1) {
        if(min > 0) {
            // all values positive: base viewBox on max value
            return [0, 0, max, height];
        } else if (max < 0) {
            // all values negative: base viewBox on min value
            return [min, 0, Math.abs(min), height];
        } else {
            // combined values: base viewBox on min and max
            return [min, 0, Math.abs(max - min), height];
        }
    }
}

export default BarChart;