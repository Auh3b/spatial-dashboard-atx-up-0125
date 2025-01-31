import DeckGLOverlay from "./maps/DeckGLOverlay";
import layers from "./layers";
import {
  getBasemapUrl,
  getCursor,
  getInteractivity,
  getViewState,
  setViewState,
} from "../store/mapStore";
import { useDispatch, useSelector } from "react-redux";
import MapPopup from "./UI/MapPopup";
import React, { useState, useEffect, useRef } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { fetchGADMData } from "./Api";
import * as turf from "@turf/turf";
import useDrawing from "./hooks/useDrawing";
import MapNav from "./UI/MapNav";
import CustomPopupContextMenu from "./UI/CustomPopupContextMenu";

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_API_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  pitch: 0,
};

function MapWrapper() {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => getViewState(state));
  const basemapUrl = useSelector(
    (state) => `mapbox://styles/mapbox/${getBasemapUrl(state)}`,
  );
  const interactivity = useSelector((state) => getInteractivity(state));
  const cursor = useSelector((state) => getCursor(state));
  const { mode, handlers } = useDrawing();
  const [popupInfo, setPopupInfo] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);

  // Fetch GADM data dynamically
  useEffect(() => {
    const loadGADMData = async () => {
      try {
        const data = await fetchGADMData("FRA", 1); // Fetch GeoJSON for US states (level 1)
        setGeojsonData(data);
      } catch (error) {
        console.error("Error loading GADM data:", error);
      }
    };

    loadGADMData();
  }, []);

  // Handle map click to fetch data for the clicked location
  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    // console.log(`Clicked coordinates: Latitude ${lat}, Longitude ${lng}`);
  };

  // Handle DrawControl events (e.g., polygons)
  const handleDrawCreate = (e) => {
    const drawnPolygon = e.features[0];
    const centroid = turf.centroid(drawnPolygon.geometry).geometry.coordinates;
    console.log(
      `Polygon centroid: Latitude ${centroid[1]}, Longitude ${centroid[0]}`,
    );
    setPopupInfo({
      longitude: centroid[0],
      latitude: centroid[1],
      message: "Polygon drawn!",
    });
  };
  const eventHandlers = handlers[mode];
  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const mapWrapperContainerRef = useRef();
  useEffect(() => {
    if (mapWrapperContainerRef.current) {
      mapWrapperContainerRef.current.addEventListener("contextmenu", (e) =>
        e.preventDefault(),
      );
    }
  }, [mapWrapperContainerRef.current]);

  return (
    <div style={{ flexGrow: 1 }} ref={mapWrapperContainerRef}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        // {...viewState}
        {...interactivity}
        {...eventHandlers}
        onMove={handleViewStateChange}
        mapStyle={basemapUrl}
        mapboxAccessToken={ACCESS_TOKEN}>
        <MapNav />
        <DeckGLOverlay layers={layers()} interleaved />
        {/* <MapPopup /> */}
        {geojsonData && (
          <Source type="geojson" data={geojsonData}>
            <Layer
              id="gadm-layer"
              type="fill"
              paint={{
                "fill-color": "rgba(0, 123, 255, 0.5)",
                "fill-outline-color": "#000",
              }}
            />
          </Source>
        )}
        {/* use MapPopup Element above */}
        <CustomPopupContextMenu />
      </Map>
    </div>
  );
}

export default MapWrapper;
