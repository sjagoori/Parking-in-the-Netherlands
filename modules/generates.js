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
  
  barchart(dataset, 'barchart', 'Amount of parkingspaces per city')
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

  piechart(data, 'piechart', 'Diversity of parkingspaces')
}

export async function generateMapchart() {
  let parkingSpaces = filterAreaIdDisabled(await getData('https://opendata.rdw.nl/resource/b3us-f26s.json'))
  let geoParkinSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
  let disabledSpaces = matchAreaId(parkingSpaces, geoParkinSpaces)
  let mapData = await getData('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson')
  mapchart(geoParkinSpaces, disabledSpaces, mapData,'mapchart', 'Dispersion of parkingspaces per category')
}