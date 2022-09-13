import React, {useState } from 'react';
//import { HexagonLayer } from '@deck.gl/aggregation-layers/typed';
import {GridCellLayer} from '@deck.gl/layers/typed';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
//import { Box } from 'grommet';
import {
  Map,
  ScaleControl,
  FullscreenControl,
  NavigationControl,
  AttributionControl,
  useControl,
} from 'react-map-gl';

//import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import mapboxgl from 'mapbox-gl';
//import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import 'mapbox-gl/dist/mapbox-gl.css';


// add to apply the following fix so that the basemap works in production: https://github.com/visgl/react-map-gl/issues/1266
// npm install worker-loader
// eslint-disable-next-line import/no-webpack-loader-syntax
//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
//mapboxgl.workerClass = MapboxWorker;

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ';

function getDataAsync() {
  return fetch('porto_novo_grid.geojson'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
  .then((response) => response.json())
  .then((responseJson) => {
    console.log('testing geojson response');
    console.log(responseJson)
    return responseJson.features;
  })
  .catch((error) => {
    console.error(error);
  });
}

function DeckGLOverlay(props: MapboxOverlayProps & {
  interleaved?: boolean;
}) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function App() {

  //https://deck.gl/docs/developer-guide/interactivity
  const [viewState, setViewState] = useState({
    longitude: 2.4753,
    latitude: 6.510,
    zoom: 9,
    maxZoom: 15,
    pitch: 30,
    bearing: 0
  });

  const layer = new GridCellLayer({
    id: 'grid-cell-layer',
    data: getDataAsync(),
    pickable: true,
    extruded: true,
    cellSize: 200,
    elevationScale: 5000,
    getPosition: d => d.geometry.coordinates,
    getFillColor: d => [48, 128, d.properties.VALUE / 165 * 255, 255],
    getElevation: d => d.properties.VALUE / 100
  });

  // const layer = new GridCellLayer({
  //   id: 'h3-hexagon-layer',
  //   data: getDataAsync(),
  //   pickable: true,
  //   wireframe: false,
  //   filled: true,
  //   extruded: true,
  //   elevationScale: 20,
  //   getHexagon: d => d.hex,
  //   getFillColor: d => [255, (1 - d.value / 500) * 255, 0],
  //   getElevation: d => d.value
  // });

  return(

      <Map
        attributionControl={false}
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <DeckGLOverlay layers={[layer]} getTooltip={({object}) => object && `${object.geometry.coordinates} value: ${object.properties.VALUE}`}/>
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <AttributionControl position="bottom-right" />
        <ScaleControl position="bottom-right" />
      </Map>

   );
};
