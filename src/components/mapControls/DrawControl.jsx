import { Popup, useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Fragment, useCallback, useState } from "react";
import { center } from "@turf/turf";

export default function DrawControl({ onGeometrySet }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const drawProps = {
    position: "top-right",
    displayControlsDefault: false,
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true,
      combine_features: true,
      uncombine_features: true,
    },
  };

  const onShapeClick = (e) => {
    const info = getFeaturePopupInfo(e);
    setPopupInfo(info);
  };

  const onCreate = useCallback(
    (e) => {
      const feature = getFeature(e);
      console.log(feature);
      onGeometrySet(feature);
    },
    [onGeometrySet],
  );

  const draw = useControl(
    () => new MapboxDraw(drawProps),
    ({ map }) => {
      map.on("draw.selectionchange", onShapeClick);
    },
    ({ map }) => {
      map.on("draw.create", onCreate);
    },
    ({ map }) => {
      map.on("draw.update", onCreate);
    },
    ({ map }) => {
      map.off("draw.selectionchange", onShapeClick);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
    },
    ({ map }) => {
      map.off("draw.update", onCreate);
    },
    {
      position: drawProps.position,
    },
  );

  return (
    <Fragment>
      {popupInfo && (
        <Popup
          style={{
            padding: "8px",
            color: "black",
          }}
          anchor="top"
          onClose={() => setPopupInfo(null)}
          latitude={popupInfo.latitude}
          longitude={popupInfo.longitude}>
          {popupInfo.info}
        </Popup>
      )}
    </Fragment>
  );
}

function getFeature(value, index = 0) {
  if (!value) return null;
  if (!value.features.length) return null;

  const feature = value.features[index];
  return feature;
}

function getFeaturePopupInfo(value) {
  const feature = getFeature(value);

  if (feature.type === "Point")
    return {
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      info: feature.geometry.type,
    };

  const centerPoint = center(feature);

  return {
    longitude: centerPoint.geometry.coordinates[0],
    latitude: centerPoint.geometry.coordinates[1],
    info: feature.geometry.type,
  };
}
