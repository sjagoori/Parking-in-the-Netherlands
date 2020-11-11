import React from 'react'
import { generateBarchart, generatePiechart, generateMapchart } from '../modules/generates'
import styles from '../styles/index.module.css'

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
    generateMapchart()
    generatePiechart()
    generateBarchart()
  }

  render() {
    const resultView = <div className={styles.container}>
      <div id="mapchart"></div>
      <div id="piechart"></div>
      <div id="barchart"></div>
    </div>
    const loadView = <div> <h1>Loading</h1> </div>

    return (
      <>
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}