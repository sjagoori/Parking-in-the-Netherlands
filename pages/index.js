import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Map from '../components/mapchart/Map'
import Pie from '../components/piechart/Pie'

export default class Index extends React.Component {
  render() {
    return (
      <>
        <FullPage>
          <GlobalStyle />

          <ChartContainer>
            <SlideText>
              <h1>Have you ever wondered how disabled-friendly the Dutch parkingspaces are?</h1>
            </SlideText>
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <Pie
              id='pieChart'
              title='The ratio of disabled-friendly parkingspaces'
              lead='In this research, we have examined 1000 parkingspaces. Out of the 1000, only 55 have parkingspots available that are suitable for disabled drivers.'
              primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
            />
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <SlideText>
              <h1>Shocking right?</h1>
              <p>It maybe is, but it gets worse</p>
            </SlideText>
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <Map
              id='disabledMap'
              title='Dispersion of disabled-friendly parking garages'
              lead='Here is where is gets nasty; of the 355 parking garages we examined, only 6 of are disabled-friendly. That means that there is at least an exclusive parkingspot in the garage for disabled drivers. Although it is just 6, they at least spread them evenly over the most populated provinces'
              primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
            />
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <Map
              id='allMap'
              title='Dispersion of regular parking garages'
              lead='There are 355 parking garages in this map; as you can see, they are usually dispersed about evenly with the exception high populated areas like the Randstad.'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
            />
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <Map
              id='completeMap'
              title='Dispersion of parkingspaces per category'
              lead='If you toggle between the categories, you will see that only a fraction of parking garages are actually disabled friendly.'
              primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
              filterOptions={['disabled', 'regular']}
            />
          </ChartContainer>

          <Devider />

          <ChartContainer>
            <SlideText>
              <i>Development by  <a href="https://www.github.com/sjagoori">sjagoori</a> </i>
              <i>Data by <a href="https://opendata.rdw.nl/">RDW</a> </i>
              <i>Oct 2020</i>
            </SlideText>
          </ChartContainer>

        </FullPage>
      </>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  *{
    overflow: hidden;
  }
  body{
      padding:0;
      margin:0;
      background-color: #14151A;
      color: white;
  }
`;

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`;

const ChartContainer = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center; 
  justify-content: center;
  flex-shrink: 0;
`
const SlideText = styled.div`
  max-width: 900px;
  text-align: center;

  & i { 
    display: block;
    margin: 5px;
    a {
      color: #FF333D
    }
  }
`

const Devider = styled.hr`
  border: none;
  height: 2px;
  width: 30%;
  background-color: #F46036;
`