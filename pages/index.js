import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Map from '../components/mapchart/Map'

const GlobalStyle = createGlobalStyle`
  body{
      padding:0;
      margin:0;
      background-color: #FEEECC;
  }
`;

export default class Index extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />

        <Map
          id='mapchart'
          title='Dispersion of parkingspaces per category'
          primarySet='https://opendata.rdw.nl/resource/b3us-f26s.json'
          secondarySet='https://opendata.rdw.nl/resource/t5pc-eb34.json'
          mapData='https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson'
          filterOptions={['disabled', 'regular']}
        />

      </>
    )
  }
}