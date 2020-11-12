import { select, selectAll } from 'd3'
import { projection } from './mapchart'

/**
 * Function handles mouseover event
 * @see {@link https://bl.ocks.org/d3noob/a22c42db65eb00d4e369} - used reference
 * @param {Event} e - mouseover  event
 * @param {Object} i - data
 */
export const handleMouseOver = (e, i) => {
  const ttcontainer = select("body").append("div")

  const tt = ttcontainer
    .attr("id", "tooltip")
    .style('z-index', '100')

  tt
    .append('p')
    .text(i.areadesc)
    .style('opacity', 1)
    .style('background-color', 'white')
    .style('position', 'absolute')
    .style('padding', '5px')
    .style('border', '1px solid black')
    .style('border-radius', '5px')
    .style('top', (e.pageY) + 'px')
    .style('left', (e.pageX) + 'px')
}

/**
 * Functon handles mouseout event
 * @param {Event} e - unused to fetch default parm
 * @param {Object} i - data
 */
export const handleMouseOut = (e, i) => {
  selectAll('#tooltip').remove()
}

/**
 * Function handles filter for map chart
 * @param {Event} d - radiobutton event
 * @param {Object} allSpaces - dataset
 * @param {Object} disabledSpaces - dataset
 */
export const handleFilter = (d, allSpaces, disabledSpaces) => {
  const pick = d.target.defaultValue
  const map = select("#mapchart").select('svg')

  switch (pick) {
    case 'regular':
      console.log(pick)
      map.selectAll('circle').remove()
      map.selectAll('circle')
        .data(allSpaces)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
        .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
        .attr('r', '4px')
        .attr('stroke', 'black')
        .attr('fill', 'yellow')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      break;
    case 'disabled':
      console.log(pick)
      map.selectAll('circle').remove()
      map.selectAll('circle').enter()
        .data(disabledSpaces)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
        .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
        .attr('r', '4px')
        .attr('stroke', 'black')
        .attr('fill', 'blue')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      break;
  }
}

/**
 * Function generated headblock 
 * @param {String} id - chart id
 * @param {String} title - chart title
 */
export const generateHeadBlock = (id, title) => {
  const head = select("#" + id).append('div')
    .style('display', 'flex')
    .style('justify-content', 'space-around')
    .style('align-items', 'flex-end')
    .style('margin-bottom', '20px')
  head.append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  const radioGroup = head.append('div')
  radioGroup
    .append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', 'disabled')
  radioGroup.append('text').attr('for', 'disabled').text('Disabled')

  radioGroup
    .append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', 'regular')
    .attr('checked', 'checked')
  radioGroup.append('text').attr('for', 'regular').text('Regular')
}