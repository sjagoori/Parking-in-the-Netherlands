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
      map.selectAll('circle').remove()
      map.selectAll('circle')
        .data(allSpaces)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
        .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
        .attr('r', '4px')
        .attr('stroke', 'black')
        .style('stroke-width', '.5px')
        .attr('fill', '#FF333D')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
      break;
    case 'disabled':
      map.selectAll('circle').remove()
      map.selectAll('circle')
        .data(disabledSpaces)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
        .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
        .attr('r', '4px')
        .attr('stroke', 'black')
        .style('stroke-width', '.5px')
        .attr('fill', '#FF333D')
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

  const container = head.append('div')
    .style('display', 'flex')
    .style('width', '200px')
    .style('justify-content', 'space-around')
    .attr('class', 'radiocontainer')

  const group1 = container.append('div')

  const group2 = container.append('div')


  const dRadio = group1.append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', 'disabled')
    .attr('id', 'disabled')
    .style('display', 'none')

  const dLabel = group1.append('label')
  dLabel.attr('for', 'disabled')
    .text('Disabled')
    .style('display', 'block')
    .style('cursor', 'pointer')

  const rRadio = group2.append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', 'regular')
    .attr('id', 'regular')
    .attr('checked', 'checked')
    .style('display', 'none')


  const rLabel = group2.append('label')
  rLabel.attr('for', 'regular')
    .text('Regular')
    .style('display', 'block')
    .style('cursor', 'pointer')





}