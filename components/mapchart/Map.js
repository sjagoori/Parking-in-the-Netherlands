import React from 'react'
import { composer } from './composer'
import { getData, filterAreaIdDisabled, matchAreaId, capitalizeFirstLetter } from '../util'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components"

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { state: false }
  }

  async componentDidMount() {
    let primarySet = this.props.primarySet ? localStorage.getItem(this.props.primarySet) != null? JSON.parse(localStorage.getItem(this.props.primarySet)) : (localStorage.setItem(this.props.primarySet, JSON.stringify(await getData(this.props.primarySet))), JSON.parse(localStorage.getItem(this.props.primarySet))) : false
    let secondarySet = this.props.secondarySet ? localStorage.getItem(this.props.secondarySet)!= null ? JSON.parse(localStorage.getItem(this.props.secondarySet)) : (localStorage.setItem(this.props.secondarySet, JSON.stringify(await getData(this.props.secondarySet))), JSON.parse(localStorage.getItem(this.props.secondarySet))) : false
    let mapData = localStorage.getItem(this.props.mapData) ? JSON.parse(localStorage.getItem(this.props.mapData)) : (localStorage.setItem(this.props.mapData, JSON.stringify(await getData(this.props.mapData))), JSON.parse(localStorage.getItem(this.props.mapData)))
    let disabledSpaces = primarySet && secondarySet ? matchAreaId(filterAreaIdDisabled(primarySet), secondarySet) : false

    let state = composer({
      chartId: this.props.id,
      title: this.props.title,
      lead: this.props.lead,
      primarySet: this.props.id == 'disabledMap' ? disabledSpaces : secondarySet,
      secondarySet: disabledSpaces,
      mapData: mapData,
      filterOptions: this.props.filterOptions ? this.props.filterOptions.map(key => capitalizeFirstLetter(key)) : false,
      credits: this.props.primarySet && this.props.secondarySet ? [this.props.primarySet, this.props.secondarySet] : this.props.secondarySet ? [this.props.secondarySet] : false
    })

    this.setState({ state: state })
  }

  render() {
    // console.log(this.state.state)
    const state = this.state.state
    const loadState = <Loader><CircularProgress /></Loader>

    if (!state) {
      return <><Chart id={this.props.id}>{loadState}</Chart></>
    } else {
      return <><Chart id={this.props.id}></Chart></>
    }
  }
}

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%; 
  transform: translateY(-50%); 
  transform: translate(-50%, -50%);
`

const Chart = styled.div`
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