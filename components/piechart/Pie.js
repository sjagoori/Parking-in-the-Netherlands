import React from 'react'
import styled from "styled-components"
import CircularProgress from '@material-ui/core/CircularProgress';
import { composer } from './composer'
import { getData, filterDisabled } from '../util'

export default class Pie extends React.Component {
  constructor(props) {
    super(props)
    this.state = { state: false }
  }

  async componentDidMount() {
    let primarySet = this.props.primarySet ? localStorage.getItem(this.props.primarySet) != null ? JSON.parse(localStorage.getItem(this.props.primarySet)) : (localStorage.setItem(this.props.primarySet, JSON.stringify(await getData(this.props.primarySet))), JSON.parse(localStorage.getItem(this.props.primarySet))) : false
    let disabledAreas = filterDisabled(primarySet, 1)

    let state = composer(
      {
        chartId: this.props.id,
        title: this.props.title,
        lead: this.props.lead,
        data: [
          {
            amount: (primarySet.length - disabledAreas.length),
            label: 'Regular parking'
          },
          {
            amount: disabledAreas.length,
            label: 'Disabled friendly'
          }
        ],
        credits: [this.props.primarySet]
      }
    )

    this.setState({ state: state })
  }

  render() {
    const state = this.state.state
    const loadState = <Loader><CircularProgress /></Loader>

    return !state ? <><Chart id={this.props.id}>{loadState}</Chart></> : <><Chart id={this.props.id}></Chart></>
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
    padding: 10px;
    div p {
      width: 350px;
    }
    @media (max-width: 800px) {
    margin: 0 auto;
    width: 90%;
    
    #pieChartlowerPart {
      flex-direction: column;
      align-items: center;
    }

    div p {
      width: 80%;
    }

    svg {
      width: 315px;
    }

    .legend {
      display: none;
      }
  }
`