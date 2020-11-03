import React from 'react'
import axios from 'axios'
import {barchart} from '../modules/charts'

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
  getData(url) {
    axios.get(url).then(response => response).then(response => this.setState({ data: { state: true, results: response.data } }))
  }

  componentDidMount() {
    console.warn('mounted')
    const data = [40, 20, 130, 60, 80]
    barchart(200, 'barchart', data);
  }

  render() {
    const resultView = <div>
      <h1>Hello world!</h1>
      <div id="barchart"></div>
    </div>
    const loadView = <div> <h1>Loading</h1> </div>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}