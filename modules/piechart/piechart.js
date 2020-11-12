import * as d3 from 'd3';
import { generateHeadBlock, generateContainerSVG, handleMouseOver, handleMouseOut, generateLegend } from './util.js'
const colors = ['#F7B332', '#FF333D']

/**
 * Piechart
 * @see {@link https://github.com/d3/d3-shape}
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function piechart(data, id, title) {
  let width = 500
  let height = 300

  generateHeadBlock(id, title)

  // add dimensions, otherwise it's overflow will be hidden
  const container = generateContainerSVG(id, width, height)
  const svg = container.append("svg")
    .attr('width', width)
    .attr('height', height)

  // Pie gen + data counts 
  let pie = d3.pie()
    .value(d => d.amount);

  // Creating arc 
  let arc = d3.arc()
    .innerRadius(100)
    .outerRadius(140);

  let g = svg.append("g")
    .attr("transform", "translate(150,150)");

  let arcs = g.selectAll("arc")
    .data(pie(data))
    .enter().append("g")
    .style('cursor', 'pointer')
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)

  // Appending path  
  arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => {
      return colors[i % Object.keys(colors).length];
    });

  // Adding data to each arc 
  arcs.append("text")
    .attr("transform", (d) => {
      return "translate(" +
        (arc.centroid(d)[0] - 8) + ',' + (arc.centroid(d)[1] + 5) + ")"
    })
    .style('fill', 'black')
    .style('font-weight', 'bold')
    .text(function (d) {
      return d.data.amount;
    })

  generateLegend(svg, data, width)
}