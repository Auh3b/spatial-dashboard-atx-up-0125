import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrawingProps,
  setDrawingProps,
  setDrawMode,
  setIsDrawing,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function usePolygonHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
  return {
    onClick: (e) => {},
    onMouseMove: () => {},
    onMouseDown: () => undefined,
    onMouseUp: useCallback(
      (e) => {
        dispatch(setIsDrawing(true));
        const { lng, lat } = e.lngLat;
        let feature;
        if (!drawingProps?.feature) {
          feature = [];
        } else {
          feature = drawingProps.feature;
        }
        feature = [...feature, [lng, lat]];
        dispatch(setDrawingProps({ feature }));
      },
      [drawingProps],
    ),
    onMouseEnter: (e) => {},
    onDblClick: useCallback(
      (e) => {
        if (!drawingProps?.feature) return;

        const { lng, lat } = e.lngLat;
        const feature = drawingProps.feature;
        const lastPoint = feature[0];
        const finalFeature = [...feature, [lng, lat], lastPoint];
        dispatch(setDrawingProps({ feature: finalFeature }));
        dispatch(setIsDrawing(false));
        dispatch(setDrawMode(DRAW_MODES.FREE));
      },
      [drawingProps],
    ),
  };
}
