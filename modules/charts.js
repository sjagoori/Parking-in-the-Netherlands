import * as d3 from 'd3';
import { color } from 'd3';
const colors = ['#F7A399', '#EF6351', '#FFCC00']

export function barchart(height, id, data) {
  const barWidth = 35;
  const barOffset = 5
  const width = (data.length * 40)

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width + 50])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - 50, 50])

  const svg = d3.select("#" + id).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#727272")
    .style('padding', '10px 10px 0 10px')
    .selectAll('rect')
    .data(data)
    .enter().append("rect")
    .style("fill", '#ffcc00')
    .attr("width", barWidth)
    .attr("height", (d) => {
      return d
    })
    .attr("x", (d, i) => {
      return x(i)
    })
    .attr("y", (d) => {
      return height - d
    })
}

/**
 * Piechart
 * @param {Object} data 
 * @param {String} id 
 */
export function piechart(data2, id) {
  console.log(data2)

  // add dimensions, otherwise it's overflow will be hidden
  let svg = d3.select("#" + id)
    .append("svg")
    .attr('width', 800)
    .attr('height', 800)

  // Creating Pie generator 
  let pie = d3.pie();

  // Creating arc 
  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100);

  let g = svg.append("g")
    .attr("transform", "translate(150,120)");

  // Grouping different arcs 
  let arcs = g.selectAll("arc")
    .data(pie(data2))
    .enter()
    .append("g")
    .on('mouseover', function (d, i) {
      d3.select(this)
        .transition()
          .duration('300')
          .attr('opacity', '.85')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('300')
        .attr('opacity', '1')
    })

  // Appending path  
  arcs.append("path")
    .attr("fill", (data, i) => {
      return colors[i % Object.keys(colors).length];
    })
    .attr("d", arc);

  // Adding data to each arc 
  arcs.append("text")
    .attr("transform", (d) => {
      return "translate(" +
        arc.centroid(d) + ")"
    })
    .style('fill', 'white')
    .text(function (d) {
      return d.data;
    })
}