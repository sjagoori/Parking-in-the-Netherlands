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
  width: 800px;
`

const Chart = styled.div`
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  .radiocontainer label {
    font-weight: 500;
    border-radius: 5px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #9a0007;
    &:hover{
      transition: .3s;
      background-color: #9a0007;
    }
  }
  .radiocontainer input[type="radio"]:checked+label {
    transition: .3s;
    background-color: #9a0007;
  }
  & path {
    fill: #1a1e28;
    stroke: #000;
    stroke-width: .3px
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
      chartId: this.props.id,
      title: this.props.title,
      lead: this.props.lead,
      primarySet: this.props.id == 'disabledMap' ? disabledSpaces : geoParkingSpaces,
      secondarySet: disabledSpaces,
      mapData: mapData,
      filterOptions: this.props.filterOptions ? this.props.filterOptions.map(key => capitalizeFirstLetter(key)) : false,
      credits: this.props.primarySet && this.props.secondarySet ? [this.props.primarySet, this.props.secondarySet] : this.props.secondarySet ? [this.props.secondarySet] : false
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