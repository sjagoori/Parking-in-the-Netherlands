import React from 'react'
import { composer } from './composer'
import { getData, filterAreaIdDisabled, matchAreaId } from '../util'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components"

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%; 
  transform: translateY(-50%); 
  transform: translate(-50%, -50%);
  `

export default class Ayo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { state: false }
  }

  async componentDidMount() {
    setTimeout(() => {

    }, 1000);
  
    let parkingSpaces = filterAreaIdDisabled(await getData('https://opendata.rdw.nl/resource/b3us-f26s.json'))
    let geoParkingSpaces = await getData('https://opendata.rdw.nl/resource/t5pc-eb34.json')
    let disabledSpaces = matchAreaId(parkingSpaces, geoParkingSpaces)
    let mapData = await getData('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson')

    let state = composer({
      primarySet: geoParkingSpaces,
      secondarySet: disabledSpaces,
      mapData: mapData,
      chartId: this.props.id,
      title: 'Dispersion of parkingspaces per category'
    })




    this.setState({ state: state })
  }

  getinitialprops(props) {
    return props
  }

  render() {
    console.log(this.state.state)
    const state = this.state.state
    const loadState = <Loader><CircularProgress /></Loader>

    if (!state) {
      return <div id={this.props.id}>{loadState}</div>
    } else {
      return <div id={this.props.id}></div>
    }
  }
}