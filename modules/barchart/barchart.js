import { select, max, scaleLinear, scaleBand, axisLeft, axisTop } from 'd3';
import { update, generateHeadBlock } from './util.js'

const colors = ['#F7B332', '#FF333D']
/**
 * Barchart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function barchart(data, id, title) {
  let a = data.filter(elem => elem.province == 'Limburg')
  let width = 600
  let height = 700
  const xValue = d => d.amount
  const yValue = d => d.name
  const margin = { top: 20, right: 20, bottom: 20, left: 110 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  generateHeadBlock(id, title, data)

  const xScale = scaleLinear()
    .domain([0, max(a, xValue)])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(a.map(yValue))
    .range([0, (a.length * 30)])
    .padding(0.1)

  // add dimensions, otherwise it's overflow will be hidden
  let svg = select("#" + id)
    .append("svg")
    .attr('width', width)
    .attr('height', (a.length * 35) + "px")
    .append('g')

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  g.append('g').call(axisLeft(yScale)).style('color', 'black').style('font-size', '1em')
  g.append('g').call(axisTop(xScale)).style('color', 'black')

  g.selectAll('rect')
    .data(a)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr("width", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .style('fill', colors[1])
    .style('stroke', 'black')
    .style('stroke-width', '.5px')
    .append('text')

  select('#province-list').on('change', (d) => {
    update(event,select('#province-list').property("value"),
      data,
      g,
      { innerWidth: innerWidth, innerHeight: innerHeight },
      svg
    )
  })
}