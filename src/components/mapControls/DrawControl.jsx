import { Popup, useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Fragment, useState } from "react";
import { center } from "@turf/turf";

export default function DrawControl() {
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

  useControl(
    () => new MapboxDraw(drawProps),
    ({ map }) => {
      map.on("draw.selectionchange", onShapeClick);
    },
    ({ map }) => {
      map.off("draw.selectionchange", onShapeClick);
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

function getFeaturePopupInfo(value) {
  if (!value) return null;
  if (!value.features.length) return null;
  if (value.features.length > 1) return null;

  const feature = value.features[0];

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
