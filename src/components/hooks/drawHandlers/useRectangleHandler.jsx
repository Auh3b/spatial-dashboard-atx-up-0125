import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { extractCoordinate, makeRectangle } from "../../../utils/geoFunc";
import { setDrawingProps, setDrawMode } from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function useRectangleHandler() {
  const dispatch = useDispatch();
  const [start, setStart] = useState(null);
  return {
    onClick: (e) => undefined,
    onMouseMove: useCallback(
      (e) => {
        if (!start) return;
        const { lng, lat } = e.lngLat;
        const end = [lng, lat];
        const rectFeature = makeRectangle(start, end);
        const raw_coord = extractCoordinate(rectFeature);
        dispatch(setDrawingProps({ feature: raw_coord }));
      },
      [start],
    ),
    onMouseDown: (e) => {
      const { lng, lat } = e.lngLat;
      setStart([lng, lat]);
    },
    onMouseUp: useCallback(
      (e) => {
        if (!start) return;
        const { lng, lat } = e.lngLat;
        const end = [lng, lat];
        const rectFeature = makeRectangle(start, end);
        const raw_coord = extractCoordinate(rectFeature);
        setStart(null);
        dispatch(setDrawingProps({ feature: raw_coord }));
        dispatch(setDrawMode(DRAW_MODES.FREE));
      },
      [start],
    ),
    onMouseEnter: (e) => {},
  };
}
