import { select, max, scaleLinear, scaleBand, axisLeft, axisTop, axisBottom, geoMercator, geoPath, selectAll } from 'd3';

const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']

/**
 * Barchart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function barchart(data, id, title) {
  let width = 600
  let height = 1200
  const xValue = d => d.amount
  const yValue = d => d.name
  const margin = { top: 20, right: 20, bottom: 20, left: 200 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

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

  let dropdownMenu = head.append('select')
    .attr('name', 'province-list')
    .attr('id', 'province-list')
    .attr('selected', 'Zeeland')


  let options = dropdownMenu.selectAll('option')
    .data([...new Set(data)])
    .enter()
    .append('option')

  options.text(d => d.province)
    .attr('value', d => d.province)

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2)

  // add dimensions, otherwise it's overflow will be hidden
  let svg = select("#" + id)
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append('g')

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  g.append('g').call(axisLeft(yScale)).style('color', 'black').style('font-size', '1em')
  g.append('g').call(axisTop(xScale)).style('color', 'black')

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr("width", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .style('fill', colors[1])
    .style('stroke', 'black')
    .style('stroke-width', '.3px')
    .append('text')

  const update = (selectedOption) => {
    let a = data.filter(elem => elem.province == selectedOption)

    const xValue = a => a.amount
    const yValue = a => a.name

    const xScale = scaleLinear()
      .domain([0, max(a, xValue)])
      .range([0, innerWidth])

    const yScale = scaleBand()
      .domain(a.map(yValue))
      .range([0, innerHeight])
      .padding(0.2)


    g.selectAll('g').remove()
    g.selectAll('rect').remove()


    g.selectAll('rect')
      .data(a)
      .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr("width", d => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .style('fill', colors[1])
      .append('text')
      .style('stroke', 'black')
      .style('stroke-width', '.3px')

      g.append('g').call(axisLeft(yScale)).style('color', 'black').style('font-size', '1em')
      g.append('g').call(axisTop(xScale)).style('color', 'black')
  }

  select('#province-list').on('change', (d) => {
    update(select('#province-list').property("value"))
  })
}

// /**
//  * Map chart
//  * @param {Object} data - dataset
//  * @param {String} id - element id for chart
//  * @param {String} title - chart title
//  */
// export function mapchart(allSpaces, disabledSpaces, mapData, id, title) {
//   const projection = geoMercator().scale(6000).center([5.116667, 52.17])
//   const path = geoPath().projection(projection)

//   const width = 600
//   const height = 550

//   let head = select("#" + id)

//   head.append('text')
//     .text(title)
//     .style('font-size', '1.8em')
//     .style('font-weight', 'bold')
//     .style('display', 'block')
//     .attr('class', 'title')

//     let radioGroup = head.append('div')
//     radioGroup
//       .append('input')
//       .attr('name', 'radiogroup')
//       .attr('type', 'radio')
//       .attr('value', 'disabled')
//     radioGroup.append('text').attr('for', 'disabled').text('Disabled')

//     radioGroup
//       .append('input')
//       .attr('name', 'radiogroup')
//       .attr('type', 'radio')
//       .attr('value', 'regular')
//       .attr('checked', 'checked')
//     radioGroup.append('text').attr('for', 'regular').text('Regular')


//   const map = select("#" + id)
//     .append("svg")
//     .attr('viewBox', [(width/4), -50, width, height])
//     .attr('width', width*1.5)
//     .attr('height', height*1.5)
//     .style('background-color', 'transparent ')

//   const g = map.append('g')

//   map.selectAll('circle')
//     .data(allSpaces)
//     .enter()
//     .append('circle')
//     .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
//     .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
//     .attr('r', '4px')
//     .attr('stroke', 'black')
//     .attr('fill', colors[0])
//     .on('mouseover', function (d, i) {
//       select(this).selectAll('circle')
//         .attr('opacity', '0')
//       select('g').append('text')
//         .text(i.areadesc)
//         .style('font-weight', 'bold')
//         .style('display', 'block')
//         .attr('class', 'mapdescription')
//         .attr("transform", "translate( 150, 0)")
//     })
//     .on('mouseout', (d, i) =>{
//       selectAll('text[class="mapdescription"]').remove()
//     })


//     g.append('g')
//     .attr('fill', '#7a7a7a')
//     .selectAll('path')
//     .data(feature(mapData, mapData.objects.gemeente_2020).features)
//     .join('path')
//     .attr('d', path);

//   // function as variables dont get hoisted,
//   // so they need to be called early
//   const ayo = (event) => {
//     let pick = event.target.defaultValue

//     switch (pick) {
//       case 'regular':
//         console.log(pick)
//         map.selectAll('circle').remove()
//         map.selectAll('circle')
//           .data(allSpaces)
//           .enter()
//           .append('circle')
//           .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
//           .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
//           .attr('r', '4px')
//           .attr('stroke', 'black')
//           .attr('fill', colors[0])
//           .on('mouseover', function (d, i) {
//             select(this).selectAll('circle')
//               .attr('opacity', '0')
//             select('g').append('text')
//               .text(i.areadesc)
//               .style('font-weight', 'bold')
//               .style('display', 'block')
//               .attr('class', 'mapdescription')
//               .attr("transform", "translate( 150, 0)")
//           })
//           .on('mouseout', (d, i) =>{
//             selectAll('text[class="mapdescription"]').remove()
//           })
//         break;
//       case 'disabled':
//         console.log(pick)
//         map.selectAll('circle').remove()
//         map.selectAll('circle')
//           .data(disabledSpaces)
//           .enter()
//           .append('circle')
//           .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
//           .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
//           .attr('r', '4px')
//           .attr('stroke', 'black')
//           .attr('fill', 'blue')
//           .on('mouseover', function (d, i) {
//             select(this).selectAll('circle')
//               .attr('opacity', '0')
//             select('g').append('text')
//               .text(i.areadesc)
//               .style('font-weight', 'bold')
//               .style('display', 'block')
//               .attr('class', 'mapdescription')
//               .attr("transform", "translate( 150, 0)")
//           })
//           .on('mouseout', (d, i) =>{
//             selectAll('text[class="mapdescription"]').remove()
//           })
//         break;
//     }
//   }
//   selectAll('input[name="radiogroup"').on('change', ayo)
// }
// export function barchart(height, id, data) {
//   const barWidth = 35;
//   const barOffset = 5
//   const width = (data.length * 40)

//   const x = d3.scaleBand()
//     .domain(d3.range(data.length))
//     .range([0, width + 50])
//     .padding(0.1)

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(data)])
//     .range([height - 50, 50])

//   const svg = d3.select("#" + id).append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "#727272")
//     .style('padding', '10px 10px 0 10px')
//     .selectAll('rect')
//     .data(data)
//     .enter().append("rect")
//     .style("fill", '#ffcc00')
//     .attr("width", barWidth)
//     .attr("height", (d) => {
//       return d
//     })
//     .attr("x", (d, i) => {
//       return x(i)
//     })
//     .attr("y", (d) => {
//       return height - d
//     })
// }