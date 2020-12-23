import { select } from 'd3';
const colors = ['#F7B332', '#FF333D']

/**
 * Function handles mouse over event
 * @param {Event} e - event
 * @param {Object} i - arch data
 */
export const handleMouseOver = (e, i) => {
  const arc = select(e.path[0])
  const centerText = select(e.path[1])

  arc.transition()
    .duration('200')
    .attr('opacity', '.70')

  centerText.append('text')
    .text(i.data.label)
    .style('position', 'absolute')
    .style('fill', 'white')
    .attr("transform", "translate(-45, 5)")
}

/**
 * Function handles mouse out event
 * @param {Event} e - event
 * @param {Object} i - arch data
 */
export const handleMouseOut = (e, i) => {
  const arc = select(e.path[0]).attr('opacity', '1')
  const centerText = select(e.path[1].childNodes[2])

  arc.transition()
    .duration('200')
    .attr('opacity', '1');
  centerText
    .remove()
}
/**
 * Function generates head block for charts
 * @param {Object} data - attributes for the headblock
 * 
 * data {
 *    id:          'string',
 *    lead:        'string'
 * }
 */
export const generateHeadBlock = (data) => {
  const head = select('#' + data.id + 'lowerPart').append('div')
    head.append('p')
    .text(data.lead)
}

/**
 * Function generates a legend for chart
 * @see {@link https://stackoverflow.com/questions/32298837/how-to-add-a-nice-legend-to-a-d3-pie-chart} - reference
 * @param {Object} svg - D3 selectable SVGElement/HTMLElement 
 * @param {Object} data - dataset
 * @param {Number} width - width used to calculate placement
 */
export const generateLegend = (svg, data, width) => {
  const legend = svg.selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function (d, i) {
      return "translate(" + (width / 1.5) + "," + (i * 25 + 120) + ")";
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
    .style('fill', 'white')
}