import { select, geoMercator, geoPath, selectAll } from 'd3';
import { feature } from 'topojson';
import { generateHeadBlock, handleFilter, handleMouseOver, handleMouseOut } from './util';
export const projection = geoMercator().scale(6000).center([5.116667, 52.17])

/**
 * Function composes map chart with datapoint elemnts
 * @see {@link https://vizhub.com/sreen020/f29bf760c4ef40efaa0343794f63e1d0?edit=files&file=index.js} - used reference
 * @param {Object} data - composer attributes
 * 
 * data {
 *    chartId:          'string',
 *    title:            'string',
 *    lead:             'string',
 *    primarySet:       'object',
 *    secondarySet:     'object',
 *    mapData:          'object',
 *    filterOptions:    'object',
 *    credit:           'string'
 * }
 */
export function composer(data) {
  const path = geoPath().projection(projection)
  const width = 500
  const height = 500

  select("#" + data.chartId).append('h1')
  .text(data.title)
  .style('margin-top', '0')
  .style('max-width', (width * 1.5) + 'px')
  .style('overflow-wrap', 'break-word')

  const lowerPart = select("#" + data.chartId)
  .append('div')
  .attr('id', data.chartId + 'lowerPart')
  .style('display', 'flex')

  generateHeadBlock({
    id: data.chartId,
    title: data.title,
    lead: data.lead,
    filterOptions: data.filterOptions ? data.filterOptions : false
  })

  const container = lowerPart.append('div')
  .style('display', 'flex')
  .style('flex-direction', 'column')

  const map = container
    .append("svg")
    .attr('viewBox', [250, 0, width, height])
    .attr('class', 'map')
    .style('background-color', 'transparent ')
    .style('width', (width * 1.1))

  const g = map.append('g')
  g.append('g')
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
    .style('stroke-width', '.5px')
    .selectAll('path')
    .data(feature(data.mapData, data.mapData.objects.gemeente_2020).features)
    .join('path')
    .attr('d', path)

  map.selectAll('circle')
    .data(data.primarySet)
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


  const creditContainer = container.append('div')
  data.credits.map(key => {
    creditContainer.append('a')
      .text(key)
      .attr('href', key)
      .style('text-align', 'right')
      .style('color', 'grey')
      .style('font-size', '.8rem')
      .style('font-style', 'italic')
      .style('display', 'block')
  })

  selectAll('input[name="radiogroup"').on('change', d => {
    handleFilter({
      id: data.chartId,
      event: d,
      primarySet: data.primarySet,
      secondarySet: data.secondarySet,
      secondaryOption: data.filterOptions[0]
    })
  })
  return true
}

