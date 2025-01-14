import React, { useEffect, useState, useRef } from "react";
import Map, { Source, Layer, Popup, NavigationControl } from "react-map-gl";
// import DeckGL from "@deck.gl/react";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { IconLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Dashboard from "./Dashboard";
import DeckGLOverlay from "./maps/DeckGLOverlay";
import DrawControl from "./mapControls/DrawControl";
import { Box, Paper, Typography } from "@mui/material";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  // pitch: 35,
};

const eventsData = [
  { name: "Event 1", coordinates: [-122.4, 37.74], entries: 5, exits: 2 },
  { name: "Event 2", coordinates: [-122.45, 37.75], entries: 3, exits: 1 },
  { name: "Event 3", coordinates: [-122.5, 37.76], entries: 10, exits: 5 },
];

function MapWrapper() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [layers, setLayers] = useState([]);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v11",
  );
  const [selectedLayer, setSelectedLayer] = useState("events");
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      const response = await fetch("src/data/countries.geojson");
      const data = await response.json();
      // const correctedGeoJson = {
      //   ...data,
      //   features: data.features.map((feature) => {
      //     feature.geometry = turf.rewind(feature.geometry, { reverse: true });
      //     return feature;
      //   }),
      // };
      setGeojsonData(data);
    };
    fetchGeoJSON();
  }, []);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv",
      );
      const text = await response.text();
      const points = text
        .split("\n")
        .slice(1)
        .map((line) => {
          const [lng, lat] = line.split(",").map(Number);
          return [lng, lat];
        });
      setHeatmapData(points);
    };
    fetchHeatmapData();
  }, []);

  const polygonLayer = new PolygonLayer({
    id: "polygon-layer",
    data: geojsonData ? geojsonData.features : [],
    getPolygon: (d) => d.geometry.coordinates[0],
    getFillColor: [200, 0, 0, 200],
    getLineColor: [255, 255, 255],
    getLineWidth: 2,
    extruded: false,
    pickable: true,
    onClick: ({ object }) => {
      setPopupInfo({
        longitude: object.geometry.coordinates[0][0][0],
        latitude: object.geometry.coordinates[0][0][1],
        name: object.properties.name,
        coordinates: object.geometry.coordinates[0],
      });
    },
  });

  const eventsLayer = new IconLayer({
    id: "events-layer",
    data: eventsData,
    getColor: (d) => [Math.sqrt(d.exits) * 255, 140, 0],
    getIcon: () => "marker",
    getPosition: (d) => d.coordinates,
    getSize: 40,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
    pickable: true,
    onClick: ({ object }) => alert(`Event clicked: ${object.name}`),
  });

  useEffect(() => {
    if (selectedLayer === "hexagon" && heatmapData) {
      setLayers([
        new HexagonLayer({
          id: "hexagon-layer",
          data: heatmapData,
          getPosition: (d) => d,
          radius: 1000,
          elevationScale: 50,
          extruded: true,
          colorRange: [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78],
          ],
          pickable: true,
        }),
      ]);
    } else if (selectedLayer === "polygon") {
      setLayers([polygonLayer]);
    } else if (selectedLayer === "events") {
      setLayers([eventsLayer]);
    }
  }, [geojsonData, heatmapData, selectedLayer]);

  const onViewStateChange = ({ viewState }) => {
    setViewState(viewState);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={mapStyle}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
        onMove={onViewStateChange}
        // style={{ width: "100%", height: "100%" }}
        // projection="mercator"
        // terrain={{ source: "mapbox-terrain", exaggeration: 1 }}
        // buildings={{ source: "mapbox-buildings" }}
        // pitch={viewState.pitch}
        // bearing={viewState.bearing}
        // minZoom={1.5}
        // maxZoom={20}
      >
        <DrawControl />
        <NavigationControl position="top-right" />
        <DeckGLOverlay layers={layers} />
        {geojsonData && (
          <Source type="geojson" data={geojsonData}>
            <Layer
              id="countries-layer"
              type="fill"
              paint={{
                "fill-color": "rgba(98, 123, 193, 0)",
                "fill-opacity": 0,
              }}
            />
          </Source>
        )}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            style={{
              backgroundColor: "white",
              width: "300px",
              padding: "10px",
              maxHeight: "300px",
              overflowY: "scroll",
              zIndex: 9999,
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div>
              <h3>Polygon Info</h3>
              <p>
                <strong>Country:</strong> {popupInfo.name}
              </p>
              <p>
                <strong>Coordinates:</strong>
              </p>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {JSON.stringify(popupInfo.coordinates, null, 2)}
              </pre>
            </div>
          </Popup>
        )}
      </Map>
      <Dashboard
        onAddLayer={(url) => console.log("Layer added:", url)}
        onSwitchStyle={(newStyle) => setMapStyle(newStyle)}
        onLayerSelect={(layerType) => setSelectedLayer(layerType)}
      />
      {/* <ViewStateViewer
        viewState={viewState}
        items={["latitude", "longitude", "zoom", "pitch"]}
      /> */}
    </div>
  );
}

// For viewing the map view state
function ViewStateViewer({ viewState, items }) {
  return (
    <Box sx={{ position: "absolute", bottom: "16px", right: "16px" }}>
      <Paper sx={{ p: 2 }}>
        {items.map((d) => (
          <Typography key={d}>
            {d}: {viewState[d]}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}

export default MapWrapper;

// import React, { useEffect, useState } from 'react'
// import Map, { Source, Layer, Popup, NavigationControl } from 'react-map-gl'
// import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core'
// import { PolygonLayer } from '@deck.gl/layers'
// import { HexagonLayer } from '@deck.gl/aggregation-layers'
// import { IconLayer } from '@deck.gl/layers'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import * as turf from '@turf/turf'

// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// import Dashboard from './Dashboard'
// import DeckGLOverlay from './maps/DeckGLOverlay'
// import DrawControl from './mapControls/DrawControl'
// import { Box, Paper, Typography } from '@mui/material'
// import { getGeoJSON } from './Api' // Ensure this path is correct based on your file structure

// const ambientLight = new AmbientLight({
//   color: [255, 255, 255],
//   intensity: 1.0,
// })

// const pointLight = new PointLight({
//   color: [255, 255, 255],
//   intensity: 0.8,
//   position: [-0.144528, 49.739968, 80000],
// })

// const lightingEffect = new LightingEffect({ ambientLight, pointLight })

// const INITIAL_VIEW_STATE = {
//   longitude: -122.46940656246574,
//   latitude: 37.7723322256912,
//   zoom: 11,
//   pitch: 35,
// }

// const eventsData = [
//   { name: 'Event 1', coordinates: [-122.4, 37.74], entries: 5, exits: 2 },
//   { name: 'Event 2', coordinates: [-122.45, 37.75], entries: 3, exits: 1 },
//   { name: 'Event 3', coordinates: [-122.5, 37.76], entries: 10, exits: 5 },
// ]

// function MapWrapper() {
//   const [geojsonData, setGeojsonData] = useState(null)
//   const [heatmapData, setHeatmapData] = useState(null)
//   const [layers, setLayers] = useState([])
//   const [mapStyle, setMapStyle] = useState(
//     'mapbox://styles/mapbox/satellite-streets-v11'
//   )
//   const [selectedLayer, setSelectedLayer] = useState('events')
//   const [popupInfo, setPopupInfo] = useState(null)
//   const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

//   // Fetch GeoJSON data from API
//   useEffect(() => {
//     const fetchGeoData = async () => {
//       try {
//         const geoData = await getGeoJSON('USA', 1) // Replace 'USA' and '1' with desired values
//         console.log(geoData) // Use this data in your map
//       } catch (error) {
//         console.error('Failed to fetch GeoJSON data:', error)
//       }
//     }

//     fetchGeoData()
//   }, [])

//   // Fetch heatmap data
//   useEffect(() => {
//     const fetchHeatmapData = async () => {
//       const response = await fetch(
//         'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
//       )
//       const text = await response.text()
//       const points = text
//         .split('\n')
//         .slice(1)
//         .map((line) => {
//           const [lng, lat] = line.split(',').map(Number)
//           return [lng, lat]
//         })
//       setHeatmapData(points)
//     }
//     fetchHeatmapData()
//   }, [])

//   // Polygon layer for displaying GeoJSON data
//   const polygonLayer = new PolygonLayer({
//     id: 'polygon-layer',
//     data: geojsonData ? geojsonData.features : [],
//     getPolygon: (d) => d.geometry.coordinates[0],
//     getFillColor: [200, 0, 0, 200],
//     getLineColor: [255, 255, 255],
//     getLineWidth: 2,
//     extruded: false,
//     pickable: true,
//     onClick: ({ object }) => {
//       setPopupInfo({
//         longitude: object.geometry.coordinates[0][0][0],
//         latitude: object.geometry.coordinates[0][0][1],
//         name: object.properties.name,
//         coordinates: object.geometry.coordinates[0],
//       })
//     },
//   })

//   // Events layer for displaying event data
//   const eventsLayer = new IconLayer({
//     id: 'events-layer',
//     data: eventsData,
//     getColor: (d) => [Math.sqrt(d.exits) * 255, 140, 0],
//     getIcon: () => 'marker',
//     getPosition: (d) => d.coordinates,
//     getSize: 40,
//     iconAtlas:
//       'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
//     iconMapping:
//       'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
//     pickable: true,
//     onClick: ({ object }) => alert(`Event clicked: ${object.name}`),
//   })

//   // Manage layers based on selected type
//   useEffect(() => {
//     if (selectedLayer === 'hexagon' && heatmapData) {
//       setLayers([
//         new HexagonLayer({
//           id: 'hexagon-layer',
//           data: heatmapData,
//           getPosition: (d) => d,
//           radius: 1000,
//           elevationScale: 50,
//           extruded: true,
//           colorRange: [
//             [1, 152, 189],
//             [73, 227, 206],
//             [216, 254, 181],
//             [254, 237, 177],
//             [254, 173, 84],
//             [209, 55, 78],
//           ],
//           pickable: true,
//         }),
//       ])
//     } else if (selectedLayer === 'polygon') {
//       setLayers([polygonLayer])
//     } else if (selectedLayer === 'events') {
//       setLayers([eventsLayer])
//     }
//   }, [geojsonData, heatmapData, selectedLayer])

//   const onViewStateChange = ({ viewState }) => {
//     setViewState(viewState)
//   }

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <Map
//         initialViewState={INITIAL_VIEW_STATE}
//         mapStyle={mapStyle}
//         mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
//         onMove={onViewStateChange}
//       >
//         <DrawControl />
//         <NavigationControl position='top-right' />
//         <DeckGLOverlay layers={layers} />
//         {geojsonData && (
//           <Source type='geojson' data={geojsonData}>
//             <Layer
//               id='countries-layer'
//               type='fill'
//               paint={{
//                 'fill-color': 'rgba(98, 123, 193, 0.5)',
//                 'fill-opacity': 0.5,
//               }}
//               onClick={(e) => {
//                 const clickedFeature = e.features[0] // Get the clicked feature
//                 console.log('Clicked Feature Data:', clickedFeature)
//               }}
//             />
//           </Source>
//         )}
//         {popupInfo && (
//           <Popup
//             longitude={popupInfo.longitude}
//             latitude={popupInfo.latitude}
//             closeButton={true}
//             closeOnClick={false}
//             anchor='top'
//           >
//             <div>
//               <h3>Polygon Info</h3>
//               <p>
//                 <strong>Country:</strong> {popupInfo.name}
//               </p>
//               <p>
//                 <strong>Coordinates:</strong>
//               </p>
//               <pre>{JSON.stringify(popupInfo.coordinates, null, 2)}</pre>
//             </div>
//           </Popup>
//         )}
//       </Map>
//       <Dashboard
//         onAddLayer={(url) => console.log('Layer added:', url)}
//         onSwitchStyle={(newStyle) => setMapStyle(newStyle)}
//         onLayerSelect={(layerType) => setSelectedLayer(layerType)}
//       />
//     </div>
//   )
// }

// export default MapWrapper
