import React from 'react'
import axios from 'axios'
import { barchart } from '../modules/charts'
import { filterDisabled } from '../modules/util'

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
    
    // Piechart
    let totalDisabledSpaces = disabledAreas.length
    let totalNormalSpaces = parkingSpaces.length
    console.log(totalNormalSpaces)
  }

  render() {
    const resultView = <div>
      {/* <h1>Hello world!</h1> */}
      <div id="barchart"></div>
    </div>
    const loadView = <div> <h1>Loading</h1> </div>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}