import * as d3 from 'd3';

export function barchart(height, id, data) {
  const barWidth = 35;
  const barOffset = 5
  const width = (data.length * 40)
  
  d3.select("#" + id).append("svg")
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
      return i * (barWidth + barOffset)
    })
    .attr("y", (d) => {
      return height - d
    })
}