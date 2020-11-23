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
    .style('color', 'black')
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
 * @param {Object} data - filter attributes
 * 
 * data {
 *    id:               'string',
 *    event:            'event object',
 *    primarySet:       'object',
 *    secondarySet:     'object',
 *    secondaryOption:  'string'
 * }
 */
export const handleFilter = (data) => {
  const pick = data.event.target.defaultValue == data.secondaryOption ? data.secondarySet : data.primarySet
  const map = select("#" + data.id)

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
 * Function generates headblock 
 * @param {Object} data - headBlock attributes
 * 
 * data {
 *    id:            'string',
 *    title:         'string',
 *    lead:          'string',
 *    filterOptions: 'object'
 * }
 */
export const generateHeadBlock = (data) => {
  const head = select("#" + data.id).append('div')
    .style('display', 'flex')
    .style('justify-content', 'space-around')
    .style('flex-direction', 'column')
  head.append('text')
    .text(data.title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')
  head.append('p')
    .text(data.lead)
    .style('width', '90%')

  const container = head.append('div')
    .style('display', 'flex')
    .style('width', '200px')
    .style('justify-content', 'space-around')
    .attr('class', 'radiocontainer')

  data.filterOptions ? generateOptions(data.filterOptions, container) : false
}

/**
 * Function generates for generateHeadblock function
 * @see {@link generateHeadBlock}
 * @param {Object} options - object of options
 * @param {Object} container - d3 container for the options to append at
 */
const generateOptions = (options, container) => options.map((key, index) => {
  const group = container.append('div')
  group.append('input')
    .attr('name', 'radiogroup')
    .attr('type', 'radio')
    .attr('value', key)
    .attr('id', key)
    .attr('checked', index == 0 ? 'checked' : '')
    .style('display', 'none')
  group.append('label')
    .attr('for', key)
    .text(key)
    .style('display', 'block')
    .style('cursor', 'pointer')
})

