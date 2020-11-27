import React, { useEffect, useRef } from 'react'
import styled from "styled-components"
import CircularProgress from '@material-ui/core/CircularProgress';
import { composer } from './composer'
import { getData, filterDisabled } from '../util'

export default function Pie(props) {
  let mounted = useRef(false)
  
  useEffect(async () => {
    let primarySet = props.primarySet ? localStorage.getItem(props.primarySet) != null ? JSON.parse(localStorage.getItem(props.primarySet)) : (localStorage.setItem(props.primarySet, JSON.stringify(await getData(props.primarySet))), JSON.parse(localStorage.getItem(props.primarySet))) : false
    let disabledAreas = filterDisabled(primarySet, 1)

    let state = composer(
      {
        chartId: props.id,
        title: props.title,
        lead: props.lead,
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
        credits: [props.primarySet]
      }
    )

    setState({ state: state })
  })

  const state = mounted
  const loadState = <Loader><CircularProgress /></Loader>
  return (
    <>
      {!state ? <><Chart id={props.id}>{loadState}</Chart></> : <><Chart id={props.id}></Chart></>}
    </>
  )
}

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%; 
  transform: translateY(-50%); 
  transform: translate(-50%, -50%);
`

const Chart = styled.div`

`