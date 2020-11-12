import { select, selectAll } from 'd3'
import { projection, colors } from './mapchart'

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
      // .on('mouseover', handleMouseOver)
      // .on('mousemove', mouseMove)
      // .on('mouseout', handleMouseOut)
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
      // .on('mouseover', handleMouseOver)
      // .on('mousemove', mouseMove)
      // .on('mouseout', handleMouseOut)
      break;
  }
}

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