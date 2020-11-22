import React from 'react'
import { composer } from './composer'
import { getData, filterAreaIdDisabled, matchAreaId, capitalizeFirstLetter } from '../util'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components"

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%; 
  transform: translateY(-50%); 
  transform: translate(-50%, -50%);
  `

const ChartContainer = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
`

const Chart = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  max-width: 800px;
  padding: 30px;
  border: 1.8px solid black;
  background-color: #FFF;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  .radiocontainer input[type="radio"]:checked+label {
    border-bottom: 2px solid red
  }
`

export default class Ayo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { state: false }
  }

  async componentDidMount() {
    let parkingSpaces = this.props.primarySet ? filterAreaIdDisabled(await getData(this.props.primarySet)) : false
    let geoParkingSpaces = this.props.secondarySet ? await getData(this.props.secondarySet) : false
    let disabledSpaces = parkingSpaces && geoParkingSpaces ? matchAreaId(parkingSpaces, geoParkingSpaces) : false
    let mapData = this.props.mapData ? await getData(this.props.mapData) : false

    let state = composer({
      primarySet: geoParkingSpaces,
      secondarySet: disabledSpaces,
      mapData: mapData,
      chartId: this.props.id,
      title: this.props.title,
      filterOptions: this.props.filterOptions ? this.props.filterOptions.map(key => capitalizeFirstLetter(key)) : false
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
      return <ChartContainer><Chart id={this.props.id}>{loadState}</Chart></ChartContainer>
    } else {
      return <ChartContainer><Chart id={this.props.id}></Chart></ChartContainer>
    }
  }
}