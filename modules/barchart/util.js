import { select, max, scaleLinear, scaleBand, axisLeft, axisTop } from 'd3';
const colors = ['#F7B332', '#FF333D']

export const handleMouseOver = (d, i) => {

}

export const mouseMove = (event, d, i) => {

}

export const handleMouseOut = (d, i) => {

}

/**
 * Function generates head block for charts
 * @param {String} id - chart to append the title on
 * @param {String} title - string data for the title
 * @param {Object} data - dataset
 */
export const generateHeadBlock = (id, title, data) => {
  const head = select("#" + id)
    .append('div')
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

  const dropdownMenu = head.append('select')
    .attr('name', 'province-list')
    .attr('id', 'province-list')
    .attr('selected', 'Zeeland')

  const options = dropdownMenu.selectAll('option')
    .data(data)
    .enter()
    .append('option')

  options.text(d => d.province)
    .attr('value', d => d.province)

  return head
}

/**
 * Function makes and renders an object based on selected option
 * @param {String} selectedOption - selected option from the dropdown menu
 * @param {Object} data - dataset
 * @param {SVGObject} g - group
 * @param {Object} inners - innerWidth and innerHeight
 */
export const update = (selectedOption, data, g, inners) => {
  let a = data.filter(elem => elem.province == selectedOption)
  console.log(typeof inners)
  const xValue = a => a.amount
  const yValue = a => a.name

  const xScale = scaleLinear()
    .domain([0, max(a, xValue)])
    .range([0, inners.innerWidth])

  const yScale = scaleBand()
    .domain(a.map(yValue))
    .range([0, inners.innerHeight])
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
    .style('stroke', 'black')
    .style('stroke-width', '.5px')
    .append('text')

  g.append('g').call(axisLeft(yScale)).style('color', 'black').style('font-size', '1em')
  g.append('g').call(axisTop(xScale)).style('color', 'black')

}