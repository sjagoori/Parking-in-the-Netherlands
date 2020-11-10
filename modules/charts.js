import * as d3 from 'd3';
import * as topojson from 'topojson';

const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']

/**
 * Barchart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function barchart(data, id, title){
  let width = 800
  let height = 300

  console.log(data)

  d3.select("#" + id).append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  // add dimensions, otherwise it's overflow will be hidden
  let svg = d3.select("#" + id)
    .append("svg")
    .attr('width', width)
    .attr('height', height)
}

/**
 * Piechart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function piechart(data, id, title) {
  let width = 800
  let height = 300

  d3.select("#" + id).append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  // add dimensions, otherwise it's overflow will be hidden
  let svg = d3.select("#" + id)
    .append("svg")
    .attr('width', width)
    .attr('height', height)

  // Pie gen + data counts 
  let pie = d3.pie()
    .value(d => {
      return d.amount;
    });

  // Creating arc 
  let arc = d3.arc()
    .innerRadius(100)
    .outerRadius(140);

  let g = svg.append("g")
    .attr("transform", "translate(150,150)");

  let arcs = g.selectAll("arc")
    .data(pie(data))
    .enter().append("g")
    .on('mouseover', function (d, i) {
      d3.select(this).selectAll('path')
        .transition()
        .duration('200')
        .attr('opacity', '.70')

      d3.select(this).append('text')
        .text(i.data.label)
        .style('position', 'absolute')
        .attr("transform", "translate(-45, 5)")
    })
    .on('mouseout', function (d, i) {
      d3.select(this).selectAll('path')
        .transition()
        .duration('200')
        .attr('opacity', '1');
      d3.select(this)
        .selectAll('text')
        .nodes()[1]
        .remove()
    })

  // Appending path  
  arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => {
      return colors[i % Object.keys(colors).length];
    });

  // Adding data to each arc 
  arcs.append("text")
    .attr("transform", (d) => {
      return "translate(" +
        (arc.centroid(d)[0] - 8) + ',' + (arc.centroid(d)[1] + 5) + ")"
    })
    .style('fill', 'black')
    .style('font-weight', 'bold')
    .text(function (d) {
      return d.data.amount;
    })

  let legendMargin = 25
  const legend = svg.selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function (d, i) {
      return "translate(" + (width / 2.5) + "," + (i * legendMargin + 120) + ")";
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

/**
 * Map chart
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function mapchart(disabledSpaces, mapData, id, title) {
  let width = 1000
  let height = 1000

  d3.select("#" + id).append('text')
    .text(title)
    .style('font-size', '1.8em')
    .style('font-weight', 'bold')
    .style('display', 'block')
    .attr('class', 'title')

  const path = d3.geoPath()

  const svg = d3.select("#" + id)
    .append("svg")
    .attr('viewBox', [0,-150, width, height])
    .attr('transform', 'translate(0,50)')

  const g = svg.append('g')

  const projection = d3.geoMercator().scale(10000).center([5.116667, 52.17])
  path.projection(projection)

  const gemeentes = g
    .append('g')
    .attr('fill', '#7a7a7a')
    .selectAll('path')
    .data(topojson.feature(mapData, mapData.objects.gemeente_2020).features)
    .join('path')
    .attr('d', path);

  const s = g 
    .append('g')
    .select('path')
    .data(disabledSpaces)
    .join('path')
    .attr('d', path) 
}



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