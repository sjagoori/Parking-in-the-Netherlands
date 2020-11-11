import { select, pie, arc, max, scaleLinear, scaleBand, axisLeft, axisTop, axisBottom, geoMercator, geoPath, selectAll } from 'd3';
import { feature } from 'topojson';
const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']

/**
 * Map chart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function mapchart(allSpaces, disabledSpaces, mapData, id, title) {
  const projection = geoMercator().scale(6000).center([5.116667, 52.17])
  const path = geoPath().projection(projection)

  const width = 600
  const height = 550

  let head = select("#" + id).append('div')
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

  let radioGroup = head.append('div')
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


  const map = select("#" + id)
    .append("svg")
    .attr('viewBox', [200, -20, width, height])
    .attr('width', 'auto')
    .attr('height', 'auto')
    .style('background-color', 'transparent ')

  const g = map.append('g')

  map.selectAll('circle')
    .data(allSpaces)
    .enter()
    .append('circle')
    .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
    .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
    .attr('r', '4px')
    .attr('stroke', 'black')
    .attr('fill', colors[0])
    .on('mouseover', function (d, i) {
      select(this).selectAll('circle')
        .attr('opacity', '0')
      select('g').append('text')
        .text(i.areadesc)
        .style('font-weight', 'bold')
        .style('display', 'block')
        .attr('class', 'mapdescription')
        .attr("transform", "translate( 260, 0)")
    })
    .on('mouseout', (d, i) => {
      selectAll('text[class="mapdescription"]').remove()
    })


  g.append('g')
    .attr('fill', '#7a7a7a')
    .selectAll('path')
    .data(feature(mapData, mapData.objects.gemeente_2020).features)
    .join('path')
    .attr('d', path);

  // function as variables dont get hoisted,
  // so they need to be called early
  const ayo = (event) => {
    let pick = event.target.defaultValue

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
          .attr('fill', colors[0])
          .on('mouseover', function (d, i) {
            select(this).selectAll('circle')
              .attr('opacity', '0')
            select('g').append('text')
              .text(i.areadesc)
              .style('font-weight', 'bold')
              .style('display', 'block')
              .attr('class', 'mapdescription')
              .attr("transform", "translate( 260, 0)")
          })
          .on('mouseout', (d, i) => {
            selectAll('text[class="mapdescription"]').remove()
          })
        break;
      case 'disabled':
        console.log(pick)
        map.selectAll('circle').remove()
        map.selectAll('circle')
          .data(disabledSpaces)
          .enter()
          .append('circle')
          .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
          .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
          .attr('r', '4px')
          .attr('stroke', 'black')
          .attr('fill', 'blue')
          .on('mouseover', function (d, i) {
            select(this).selectAll('circle')
              .attr('opacity', '0')
            select('g').append('text')
              .text(i.areadesc)
              .style('font-weight', 'bold')
              .style('display', 'block')
              .attr('class', 'mapdescription')
              .attr("transform", "translate( 260, 0)")
          })
          .on('mouseout', (d, i) => {
            selectAll('text[class="mapdescription"]').remove()
          })
        break;
    }
  }
  selectAll('input[name="radiogroup"').on('change', ayo)
}