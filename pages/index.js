import React from 'react'
import axios from 'axios'
import { barchart, piechart } from '../modules/charts'
import { filterDisabled } from '../modules/util'
import { normalizeRouteRegex } from 'next/dist/lib/load-custom-routes'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        state: true,
        results: ['loading']
      }
    }
  }

  /**
  * Funtion makes a GET request to given url 
  * @param {String} url - API endpoint
  */
  async getData(url) {
    return await axios.get(url).then(response => response.data)
  }

  async componentDidMount() {
    console.warn('mounted')

    let parkingSpaces = await this.getData('https://opendata.rdw.nl/resource/b3us-f26s.json')
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

  render() {
    const resultView = <div>
      {/* <h1>Hello world!</h1> */}
      <div id="chart"></div>
    </div>
    const loadView = <div> <h1>Loading</h1> </div>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}