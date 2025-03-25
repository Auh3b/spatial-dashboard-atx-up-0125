import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import Map from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasemapUrl,
  getInteractivity,
  setViewState,
} from "../store/mapStore";
import useDrawing from "./hooks/useDrawing";
import useMapLayers from "./hooks/useMapLayers";
import DeckGLOverlay from "./maps/DeckGLOverlay";

import { getDrawingLayers, getExplorationLayers } from "./layers";
import CustomPopupContextMenu from "./UI/CustomPopupContextMenu/index.jsx";
import Legend from "./UI/Legend";
import MapNav from "./UI/MapNav";
import DrawToolGuideUI from "./UI/MapActionsUI/DrawToolGuideUI.jsx";

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_API_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 33.7741195,
  latitude: -13.9626121,
  zoom: 1,
  pitch: 0,
};

function MapWrapper() {
  const dispatch = useDispatch();
  const basemapUrl = useSelector(
    (state) => `mapbox://styles/mapbox/${getBasemapUrl(state)}`
  );
  const interactivity = useSelector((state) => getInteractivity(state));
  const { cursor, mode, handlers } = useDrawing();
  const { layers } = useMapLayers();

  const eventHandlers = handlers[mode];
  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const mapWrapperContainerRef = useRef();
  useEffect(() => {
    if (mapWrapperContainerRef.current) {
      mapWrapperContainerRef.current.addEventListener("contextmenu", (e) =>
        e.preventDefault()
      );
    }
  }, [mapWrapperContainerRef.current]);

  return (
    <div style={{ flexGrow: 1 }} ref={mapWrapperContainerRef}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        cursor={cursor}
        {...interactivity}
        {...eventHandlers}
        onMove={handleViewStateChange}
        mapStyle={basemapUrl}
        mapboxAccessToken={ACCESS_TOKEN}
      >
        <DrawToolGuideUI />
        <MapNav />
        <DeckGLOverlay
          getCursor={() => cursor}
          layers={[...getExplorationLayers(), ...layers, ...getDrawingLayers()]}
          interleaved
        />

        <Legend />
        <CustomPopupContextMenu />
      </Map>
    </div>
  );
}

export default MapWrapper;
