import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Map from '../components/mapchart/Map'

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

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center; 
  justify-content: center;
  flex-shrink: 0;
`

const Devider = styled.hr`
  border: none;
  height: 2px;
  width: 30%;
  background-color: #F46036;
`

export default class Index extends React.Component {
  render() {
    return (
      <>
        <FullPage>
          <GlobalStyle />
          <MapContainer>
            <Map
              id='disabledMap'
              title='Disabled'
              lead='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'
              primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
            />
          </MapContainer>

          <Devider />

          <MapContainer>
            <Map
              id='allMap'
              title='All'
              lead='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
            />
          </MapContainer>

          <Devider />

          <MapContainer>
            <Map
              id='completeMap'
              title='Complete'
              lead='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'
              primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
              secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
              mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
              filterOptions={['disabled', 'regular']}
            />
          </MapContainer>
        </FullPage>
      </>
    )
  }
}