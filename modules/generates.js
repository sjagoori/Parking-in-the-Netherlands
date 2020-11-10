import { barchart, piechart, mapchart } from './charts'
import { getData, filterDisabled, filterAreaIdDisabled, matchAreaId } from './util'

export async function generatePiechart() {
  let parkingSpaces = await getData('https://opendata.rdw.nl/resource/b3us-f26s.json')
  let disabledAreas = filterDisabled(parkingSpaces, 1)

  let data = [
    {
      amount: disabledAreas.length,
      label: 'Disabled friendly'
    },
    {
      amount: parkingSpaces.length,
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

  piechart(data, 'chart', 'The amount of parking places that are disabled friendly')
}

export async function generateMapchart() {
  let parkingSpaces = filterAreaIdDisabled(await getData('https://opendata.rdw.nl/resource/b3us-f26s.json'))
  let geoParkinSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
  let disabledSpaces = matchAreaId(parkingSpaces, geoParkinSpaces)
  mapchart(disabledSpaces,'chart', 'Some title for the mapchart')
}