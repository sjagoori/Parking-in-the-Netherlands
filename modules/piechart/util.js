import { select } from 'd3';
const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']

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
 * @param {String} id - chart to append the title on
 * @param {String} title - string data for the title
 */
export const generateHeadBlock = (id, title) => {
  const head = select("#" + id).append('div')
    .style('margin-bottom', '20px')
    .style('display', 'flex')
    .style('justify-content', 'center')

  head.append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')
}

/**
 * Function generates a container for the SVG
 * @param {String} id - chart id to append container to
 * @param {Number} width - desired width
 * @param {Number} height - desired height
 */
export const generateContainerSVG = (id, width, height) => {
  const container = select("#" + id)
    .append('div')
    .style('display', 'flex')
    .style('justify-content', 'center')
  return container
}

/**
 * Function generates a legend for chart
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
    .style('fill', 'black')
}
