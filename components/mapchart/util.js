import { select, selectAll } from 'd3'
import { projection } from './composer'

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
export const handleMouseOut = () => {
  selectAll('#tooltip').remove()
}

/**
 * Function handles filter for map chart
 * @param {Event} d - radiobutton event
 * @param {Object} allSpaces - dataset
 * @param {Object} disabledSpaces - dataset
 */
export const handleFilter = (d, allSpaces, disabledSpaces) => {
  const pick = d.target.defaultValue == 'disabled' ? disabledSpaces : allSpaces
  const map = select("#mapchart")

  map.selectAll('circle').remove()
  map.select('svg').selectAll('circle')
    .data(pick)
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
}

/**
 * Function generated headblock 
 * @param {String} id - chart id
 * @param {String} title - chart title
 * @param {Object} options - options for dropdown
 */
export const generateHeadBlock = (data) => {
  const head = select("#" + data.id).append('div')
    .style('display', 'flex')
    .style('justify-content', 'space-around')
    .style('align-items', 'flex-end')
    .style('margin-bottom', '20px')
  head.append('text')
    .text(data.title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  const container = head.append('div')
    .style('display', 'flex')
    .style('width', '200px')
    .style('justify-content', 'space-around')
    .attr('class', 'radiocontainer')

  data.filterOptions ? generateOptions(data.filterOptions, container) : false

}

const generateOptions = (options, container) => options.map(key => {
  const group = container.append('div')
  group.append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', key)
    .attr('id', key)
    .style('display', 'none')
  group.append('label')
    .attr('for', key)
    .text(key)
    .style('display', 'block')
    .style('cursor', 'pointer')
})