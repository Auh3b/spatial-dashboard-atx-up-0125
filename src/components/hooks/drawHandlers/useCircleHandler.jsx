import React, { useCallback, useState } from "react";
import {
  extractCoordinate,
  getDistance,
  makeCircle,
} from "../../../utils/geoFunc";
import { useDispatch } from "react-redux";
import {
  setCursor,
  setDrawingProps,
  setDrawMode,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function useCircleHandler() {
  const dispatch = useDispatch();
  const [center, setCenter] = useState(null);
  return {
    onClick: (e) => undefined,
    onMouseMove: useCallback(
      (e) => {
        if (!center) return;
        const { lng, lat } = e.lngLat;
        const end = [lng, lat];
        const radius = getDistance(center, end);
        const circleFeature = makeCircle(center, radius);
        const raw_coord = extractCoordinate(circleFeature);
        dispatch(setDrawingProps({ feature: raw_coord }));
      },
      [center],
    ),
    onMouseDown: (e) => {
      const { lng, lat } = e.lngLat;
      setCenter([lng, lat]);
    },
    onMouseUp: useCallback(
      (e) => {
        if (!center) return;
        const { lng, lat } = e.lngLat;
        const end = [lng, lat];
        const radius = getDistance(center, end);
        const circleFeature = makeCircle(center, radius);
        const raw_coord = extractCoordinate(circleFeature);
        setCenter(null);
        dispatch(setDrawingProps({ feature: raw_coord }));
        dispatch(setDrawMode(DRAW_MODES.FREE));
        dispatch(setCursor("grab"));
      },
      [center],
    ),
    onMouseEnter: (e) => {
      dispatch(setCursor("crosshair"));
    },
  };
}
