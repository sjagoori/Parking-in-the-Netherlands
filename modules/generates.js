import { mapchart } from './mapchart/mapchart'
import { piechart } from './piechart/piechart'
import { barchart } from './barchart/barchart'
import { getData, filterDisabled, filterAreaIdDisabled, matchAreaId, getLocationNames, findProvince } from './util'

//TODO return boolean for loading state in index.js

/**
 * Function prepares dataset and generates a barchart
 */
export async function generateBarchart() {
  let geoParkinSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
  let provinceData = await getData('https://opendata.rdw.nl/resource/ygq4-hh5q.json')

  let a = getLocationNames(geoParkinSpaces)
  let uniques = [...new Set(a)]
  let dataset = []
  uniques.map(cityName => {
    let province = findProvince(cityName, provinceData)
    dataset.push({
      name: cityName,
      amount: a.reduce((k, i) => { return k + (i === cityName) }, 0),
      province: province != undefined ? province : 'Anders' 
    })
  })
  
  barchart(dataset, 'barchart', 'Parkingspace dispresion per city per province')
}

/**
 * Function prepares dataset and generates a piechart
 */
export async function generatePiechart() {
  let parkingSpaces = await getData('https://opendata.rdw.nl/resource/b3us-f26s.json')
  let disabledAreas = filterDisabled(parkingSpaces, 1)

  let data = [
    {
      amount: disabledAreas.length,
      label: 'Disabled friendly'
    },
    {
      amount: (parkingSpaces.length-disabledAreas.length),
      label: 'Regular parking'
    }
  ]

  let sampleData = [
    {
      amount: disabledAreas.length,
      label: 'Disabled'
    },
    {
      amount: 300,
      label: 'AAA'
    },
    {
      amount: 100,
      label: 'ZZZ'
    },
    {
      amount: 700,
      label: 'BBB'
    },
    {
      amount: 100,
      label: 'CCC'
    },
    {
      amount: 500,
      label: 'Regular'
    }
  ]

  piechart(data, 'piechart', 'The amount of parking places that are disabled friendly')
}

export async function generateMapchart() {
  let parkingSpaces = filterAreaIdDisabled(await getData('https://opendata.rdw.nl/resource/b3us-f26s.json'))
  let geoParkinSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
  let disabledSpaces = matchAreaId(parkingSpaces, geoParkinSpaces)
  let mapData = await getData('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson')
  mapchart(geoParkinSpaces, disabledSpaces, mapData,'mapchart', 'Difference in parking spaces per driver type')
}