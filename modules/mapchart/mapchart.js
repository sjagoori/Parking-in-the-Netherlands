import { select, geoMercator, geoPath, selectAll } from 'd3';
import { feature } from 'topojson';
import { generateHeadBlock, handleFilter, handleMouseOver, handleMouseOut } from './util';
export const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']
export const projection = geoMercator().scale(6000).center([5.116667, 52.17])

/**
 * Map chart
 * @see {@link https://vizhub.com/sreen020/f29bf760c4ef40efaa0343794f63e1d0?edit=files&file=index.js} - used reference
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function mapchart(allSpaces, disabledSpaces, mapData, id, title) {
  const path = geoPath().projection(projection)
  const width = 600
  const height = 550

  generateHeadBlock(id, title)

  const svg = select("#" + id)
    .append("svg")
    .attr('viewBox', [200, -20, width, height])
    .attr('width', 'auto')
    .attr('height', 'auto')
    .attr('class', 'map')
    .style('background-color', 'transparent ')

  const g = svg.append('g')
  console.log(svg)
  svg.selectAll('circle')
    .data(allSpaces)
    .enter()
    .append('circle')
    .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
    .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
    .attr('r', '4px')
    .attr('stroke', 'black')
    .attr('fill', colors[0])
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)

  g.append('g')
    .attr('fill', '#7a7a7a')
    .selectAll('path')
    .data(feature(mapData, mapData.objects.gemeente_2020).features)
    .join('path')
    .attr('d', path);

  selectAll('input[name="radiogroup"').on('change', d => handleFilter(d, allSpaces, disabledSpaces))
}