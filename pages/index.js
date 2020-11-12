import React from 'react'
import { generateBarchart, generatePiechart, generateMapchart } from '../modules/generates'
import { createGlobalStyle } from 'styled-components'
import styled from "styled-components"

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
const Chart = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  padding: 30px;
  border: 1.8px solid black;
  background-color: #FFF;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FEEECC;

  .radiocontainer input[type="radio"]:checked+label {
    border-bottom: 2px solid red
  }
`


export default class Index extends React.Component {
  async componentDidMount() {
    console.warn('mounted')
    generateMapchart()
    generatePiechart()
    generateBarchart()
  }

  render() {
    const resultView = <ChartContainer>
      <Chart id="mapchart"></Chart>
      <Chart id="piechart"></Chart>
      <Chart id="barchart"></Chart>
    </ChartContainer>

    return (
      <>
        <GlobalStyle />
        {resultView}
      </>)
  }
}