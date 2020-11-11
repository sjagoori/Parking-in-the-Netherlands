import { mapchart } from './mapchart'
import { piechart } from './piechart'
import { barchart } from './barchart'
import { getData, filterDisabled, filterAreaIdDisabled, matchAreaId, getLocationNames, findProvince } from './util'

//TODO return boolean for loading state in index.js

/**
 * Function prepares dataset and generates a barchart
 */
export async function generateBarchart() {
  let geoParkinSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
  let provinceData = await getData('https://opendata.rdw.nl/resource/ygq4-hh5q.json')

  let a = getLocationNames(geoParkinSpaces)
  let u = [...new Set(a)]
  let b = []
  u.map(word => {
    let p = findProvince(word, provinceData)
    b.push({
      name: word,
      amount: a.reduce((k, i) => { return k + (i === word) }, 0),
      province: p != undefined ? p : 'Anders' 
    })
  })
  
  barchart(b, 'barchart', 'Parkingspace dispresion per city per province')
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