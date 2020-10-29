import React from 'react'
import axios from 'axios'
import { filterData } from '../modules/util'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        state: false,
        results: ['loading']
      }
    }
  }

  getData() {
    const callURL = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json';
    axios.get(callURL).then(response => response).then(response => this.setState({ data: { state: true, results: response.data } }))
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const dataset = this.state.data.results
    const kentekenData = filterData(dataset, 'kenteken')
    // console.log(filterData(dataset, 'kenteken'))

    const resultView = <div> {kentekenData} </div>
    const loadView = <span>Loading</span>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}