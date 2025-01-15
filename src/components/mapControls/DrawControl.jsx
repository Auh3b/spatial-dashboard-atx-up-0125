import { useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useCallback } from "react";
import { center } from "@turf/turf";
import { useDispatch } from "react-redux";
import { setPopup } from "../../store/mapStore";

// This Draw Control will be replace by custom draw tools
export default function DrawControl() {
  const dispatch = useDispatch();
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
    dispatch(setPopup({ show: true, ...info }));
  };

  const onDraw = useCallback((e) => {
    const feature = getFeature(e);
  }, []);

  const draw = useControl(
    () => new MapboxDraw(drawProps),
    ({ map }) => {
      map.on("draw.selectionchange", onShapeClick);
    },
    // ({ map }) => {
    //   map.on("draw.create", onDraw);
    // },
    // ({ map }) => {
    //   map.on("draw.update", onDraw);
    // },
    ({ map }) => {
      map.off("draw.selectionchange", onShapeClick);
    },
    // ({ map }) => {
    //   map.off("draw.create", onDraw);
    // },
    // ({ map }) => {
    //   map.off("draw.update", onDraw);
    // },
    {
      position: drawProps.position,
    },
  );

  return null;
}

function getFeature(value, index = 0) {
  if (!value) return null;
  if (!value.features.length) return null;
  const feature = value.features[index];
  return feature;
}

function getFeaturePopupInfo(value) {
  const feature = getFeature(value);

  if (feature.geometry.type === "Point")
    return {
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      content: feature.geometry.type,
    };

  const centerPoint = center(feature);

  return {
    longitude: centerPoint.geometry.coordinates[0],
    latitude: centerPoint.geometry.coordinates[1],
    content: feature.geometry.type,
  };
}
