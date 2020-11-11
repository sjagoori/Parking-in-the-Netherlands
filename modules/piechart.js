import * as d3 from 'd3';
import { select} from 'd3';
const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']

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

  let head = select("#" + id).append('div')
  .style('margin-bottom', '20px')
  .style('display', 'flex')
  .style('justify-content', 'center')

  head.append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  // add dimensions, otherwise it's overflow will be hidden

  let container = select("#" + id).append('div')
  .style('display', 'flex')
  .style('justify-content', 'center')

  // .style('tranform', 'translate(-50%)')
  // .style('align-items', 'center')

  let svg = container
    .append("svg")
    .attr('width', width)
    .attr('height', height)


  // Pie gen + data counts 
  let pie = d3.pie()
    .value(d => {
      return d.amount;
    });

  // Creating arc 
  let arc = d3.arc()
    .innerRadius(100)
    .outerRadius(140);

  let g = svg.append("g")
    .attr("transform", "translate(150,150)");

  let arcs = g.selectAll("arc")
    .data(pie(data))
    .enter().append("g")
    .on('mouseover', function (d, i) {
      select(this).selectAll('path')
        .transition()
        .duration('200')
        .attr('opacity', '.70')

      select(this).append('text')
        .text(i.data.label)
        .style('position', 'absolute')
        .attr("transform", "translate(-45, 5)")
    })
    .on('mouseout', function (d, i) {
      select(this).selectAll('path')
        .transition()
        .duration('200')
        .attr('opacity', '1');
      select(this)
        .selectAll('text')
        .nodes()[1]
        .remove()
    })

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

  let legendMargin = 25
  const legend = svg.selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function (d, i) {
      return "translate(" + (width / 1.5) + "," + (i * legendMargin + 120) + ")";
    })
    .attr('class', 'legend')

  legend.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr("fill", (data, i) => {
      return colors[i % Object.keys(colors).length];
    })
    .style('x', "-5")
    .style('rx', "50")

  legend.append('text')
    .text((d) => {
      return d.label
    })
    .attr('x', 10)
    .attr('y', 10)
    .style('fill', 'black')
}