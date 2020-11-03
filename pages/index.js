import React from 'react'
import axios from 'axios'

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

  /**
  * Funtion makes a GET request to given url 
  * @param {String} url - API endpoint
  */
  getData(url) {
    axios.get(url).then(response => response).then(response => this.setState({ data: { state: true, results: response.data } }))
  }

  componentDidMount() {
    console.warn('mounted')
  }

  render() {
    const resultView = <div> <h1>Hello world!</h1> </div>
    const loadView = <div> <h1>Loading</h1> </div>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}
