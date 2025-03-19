import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setDrawingProps,
  setDrawMode,
  setIsDrawing,
  setPopup,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";
import {
  extractCoordinate,
  getDistance,
  makeCircle,
} from "../../../utils/geoFunc";

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
        dispatch(
          setDrawingProps({ feature: raw_coord, type: DRAW_MODES.CIRCLE }),
        );
      },
      [center],
    ),
    onMouseDown: (e) => {
      const { lng, lat } = e.lngLat;
      setCenter([lng, lat]);
      dispatch(setIsDrawing(true));
    },
    onMouseUp: useCallback(
      (e) => {
        if (!center) return;
        const { x, y } = e.point;
        const { lng, lat } = e.lngLat;
        const end = [lng, lat];
        const radius = getDistance(center, end);
        const circleFeature = makeCircle(center, radius);
        const raw_coord = extractCoordinate(circleFeature);
        setCenter(null);
        dispatch(
          setDrawingProps({ feature: raw_coord, type: DRAW_MODES.CIRCLE }),
        );
        dispatch(setIsDrawing(false));
        dispatch(setDrawMode(DRAW_MODES.FREE));
        dispatch(
          setPopup({
            x,
            y,
            geometry: "circle",
            show: true,
            feature: raw_coord,
            type: "drawing",
          }),
        );
      },
      [center],
    ),
    onMouseEnter: (e) => {},
  };
}
