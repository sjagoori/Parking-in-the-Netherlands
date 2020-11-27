import React, { useEffect, useRef  } from 'react'
import { composer } from './composer'
import { getData, filterAreaIdDisabled, matchAreaId, capitalizeFirstLetter } from '../util'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components"

export default function Map(props) {
  let mounted = useRef(false)

  useEffect(async () => {
    if (!mounted.current) {
      let primarySet = props.primarySet ? localStorage.getItem(props.primarySet) != null ? JSON.parse(localStorage.getItem(props.primarySet)) : (localStorage.setItem(props.primarySet, JSON.stringify(await getData(props.primarySet))), JSON.parse(localStorage.getItem(props.primarySet))) : false
      let secondarySet = props.secondarySet ? localStorage.getItem(props.secondarySet) != null ? JSON.parse(localStorage.getItem(props.secondarySet)) : (localStorage.setItem(props.secondarySet, JSON.stringify(await getData(props.secondarySet))), JSON.parse(localStorage.getItem(props.secondarySet))) : false
      let mapData = localStorage.getItem(props.mapData) ? JSON.parse(localStorage.getItem(props.mapData)) : (localStorage.setItem(props.mapData, JSON.stringify(await getData(props.mapData))), JSON.parse(localStorage.getItem(props.mapData)))
      let disabledSpaces = primarySet && secondarySet ? matchAreaId(filterAreaIdDisabled(primarySet), secondarySet) : false

      let state = composer({
        chartId: props.id,
        title: props.title,
        lead: props.lead,
        primarySet: props.id == 'disabledMap' ? disabledSpaces : secondarySet,
        secondarySet: disabledSpaces,
        mapData: mapData,
        filterOptions: props.filterOptions ? props.filterOptions.map(key => capitalizeFirstLetter(key)) : false,
        credits: props.primarySet && props.secondarySet ? [props.primarySet, props.secondarySet] : props.secondarySet ? [props.secondarySet] : false
      })

      mounted = state
    }
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