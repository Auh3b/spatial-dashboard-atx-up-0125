import React, { useState } from "react";
import Map, { Popup, NavigationControl, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Dashboard from "./Dashboard";
import DeckGLOverlay from "./maps/DeckGLOverlay";
import DrawControl from "./mapControls/DrawControl";
import { Box, Paper, Typography } from "@mui/material";
import layers from "./layers";
import { getBasemapUrl, getPopup, removePopup } from "../store/mapStore";
import { useDispatch, useSelector } from "react-redux";

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  pitch: 0,
};

function MapWrapper() {
  const dispatch = useDispatch();
  // const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/light-v10");
  const basemapUrl = useSelector(
    (state) => `mapbox://styles/mapbox/${getBasemapUrl(state)}`,
  );
  const popupInfo = useSelector((state) => getPopup(state));

  const [overlayGeometry, setOverlayGeometry] = useState(null);

  const onGeometrySet = (geom) => {
    setOverlayGeometry(geom);
  };

  const handlePopupClose = () => {
    dispatch(removePopup());
  };
  console.log(popupInfo);
  return (
    <div style={{ flexGrow: 1 }}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={basemapUrl}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
        // onMove={onViewStateChange}
      >
        <DrawControl onGeometrySet={onGeometrySet} />
        <NavigationControl position="top-right" />
        <DeckGLOverlay layers={layers()} interleaved />
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="top"
            // onClose={handlePopupClose}
            style={{
              backgroundColor: "white",
              width: "300px",
              padding: "10px",
              maxHeight: "300px",
              zIndex: 9999,
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div>
              <h3>Polygon Info</h3>
              <p>
                <strong>Country:</strong> {popupInfo.name}
              </p>
            </div>
          </Popup>
        )}
      </Map>
      {/* <Dashboard
        onAddLayer={(url) => console.log("Layer added:", url)}
        onSwitchStyle={(newStyle) => setMapStyle(newStyle)}
        onLayerSelect={(layerType) => setSelectedLayer(layerType)}
      /> */}
    </div>
  );
}

function ViewLayerOrder() {
  const { current: map } = useMap();
  if (map?.getStyle()?.layers) {
    console.log(map.getStyle().layers);
  }
  return null;
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
