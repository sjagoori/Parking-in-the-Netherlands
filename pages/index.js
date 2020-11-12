import React from 'react'
import { generateBarchart, generatePiechart, generateMapchart } from '../modules/generates'
import { createGlobalStyle } from 'styled-components'
import styled from "styled-components"

const GlobalStyle = createGlobalStyle`
  body{
      padding:0;
      margin:0;
  }
`;

const ChartContainer = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
`
const Chart = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #D3D3D3;
  background-color: #FFF;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

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
    // generatePiechart()
    // generateBarchart()
  }

  render() {
    const resultView = <ChartContainer>
      <Chart id="mapchart"></Chart>
      <Chart id="piechart"></Chart>
      <Chart id="barchart"></Chart>
    </ChartContainer>

    const loadView = <div>
      <h1>Loading</h1>
    </div>

    return (
      <>
        <GlobalStyle />
        {/* {loadView} */}
        { this.state.data.state ? resultView : loadView}
      </>)
  }
}