import React from "react";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DeckGLOverlay from "./maps/DeckGLOverlay";
import DrawControl from "./mapControls/DrawControl";
import layers from "./layers";
import { getBasemapUrl, getInteractivity } from "../store/mapStore";
import { useSelector } from "react-redux";
import DrawTools from "./UI/DrawTools";
import MapPopup from "./UI/MapPopup";

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  pitch: 0,
};

function MapWrapper() {
  const basemapUrl = useSelector(
    (state) => `mapbox://styles/mapbox/${getBasemapUrl(state)}`,
  );
  const interactivity = useSelector((state) => getInteractivity(state));
  return (
    <div style={{ flexGrow: 1 }}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        {...interactivity}
        mapStyle={basemapUrl}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}>
        <DrawTools />
        <DrawControl />
        <NavigationControl position="top-right" />
        <DeckGLOverlay layers={layers()} interleaved />
        <MapPopup />
      </Map>
    </div>
  );
}

export default MapWrapper;
