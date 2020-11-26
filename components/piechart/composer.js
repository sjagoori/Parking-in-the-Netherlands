import * as d3 from 'd3';
import { generateHeadBlock, handleMouseOver, handleMouseOut, generateLegend } from './util.js'
const colors = ['#F7B332', '#FF333D']

/**
 * Function composes pie chart with datasets
 * @see {@link https://github.com/d3/d3-shape}
 * @param {Object} data - composer attributes
 * 
 * data{
 *    chartId:          'string',
 *    title:            'string',
 *    lead:             'string',  
 *    data:             'object'  
 * }
 */
export function composer(data) {
  let width = 500
  let height = 300

  d3.select("#" + data.chartId).append('h1')
    .text(data.title)
    .style('margin-top', '0')
    .style('max-width', (width * 1.5) + 'px')
    .style('overflow-wrap', 'break-word')

  const lowerPart = d3.select("#" + data.chartId)
    .append('div')
    .attr('id', data.chartId + 'lowerPart')
    .style('width', '1000px')
    .style('display', 'flex')
    .style('justify-content', 'space-between')

  generateHeadBlock({
    id: data.chartId,
    lead: data.lead
  })

  const container = lowerPart.append('div')
    .style('display', 'flex')
    .style('flex-direction', 'column')

  const svg = container.append('div').append("svg")
    .attr('width', width)
    .attr('height', height)

  // Pie gen + data counts 
  const pie = d3.pie()
    .value(d => d.amount);

  // Creating arc 
  const arc = d3.arc()
    .innerRadius(100)
    .outerRadius(140);

  const g = svg.append("g")
    .attr("transform", "translate(150,150)");

  const arcs = g.selectAll("arc")
    .data(pie(data.data))
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

  generateLegend(svg, data.data, width)

  const creditContainer = container.append('div')
  data.credits.map(key => {
    creditContainer.append('a')
      .text(key)
      .attr('href', key)
      .style('text-align', 'right')
      .style('color', 'grey')
      .style('font-size', '.8rem')
      .style('font-style', 'italic')
      .style('display', 'block')
  })
  
  return true
}