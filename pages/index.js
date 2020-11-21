import React from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from "styled-components"
import Map from '../components/mapchart/Map'

const GlobalStyle = createGlobalStyle`
  body{
      padding:0;
      margin:0;
      background-color: #FEEECC;
  }
`;

const ChartContainer = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
`

export default class Index extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <ChartContainer>
          <Map id="mapchart" />
        </ChartContainer>
      </>
    )
  }
}