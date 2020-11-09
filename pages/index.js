import React from 'react'
import { getData, filterDisabled, filterAreaIdDisabled, matchAreaId } from '../modules/util'
import {generatePiechart} from '../modules/generates'

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

  async componentDidMount() {
    console.warn('mounted')

    // generatePiechart()
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