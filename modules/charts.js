import * as d3 from 'd3';

export function barchart(height, width, id, data) {
  const barWidth = 35;
  const barOffset = 5

  d3.select("#" + id).append("svg")
    .attr("width", (data.length * 40))
    .attr("height", height)
    .style("background-color", "#727272")
    .style('padding', '10px 10px 0 10px')
    .selectAll('rect')
    .data(data)
    .enter().append("rect")
    .style("fill", '#ffcc00')
    .attr("width", 35)
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