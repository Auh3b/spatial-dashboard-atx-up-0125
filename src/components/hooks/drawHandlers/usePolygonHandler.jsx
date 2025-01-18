import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrawingProps,
  setDrawingProps,
  setDrawMode,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function usePolygonHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
  return {
    onClick: (e) => {},
    onMouseMove: () => {},
    // onMouseMove: useCallback(
    //   (e) => {
    //     if (!drawingProps) return;
    //     const { lng, lat } = e.lngLat;
    //     const feature = drawingProps.feature;
    //     const last_coord = feature.at(-1);

    //     dispatch(
    //       setDrawingProps({
    //         feature: [...feature, [[last_coord, [lng, lat]]]],
    //       }),
    //     );
    //   },
    //   [drawingProps],
    // ),
    onMouseDown: () => undefined,
    onMouseUp: useCallback(
      (e) => {
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
    onMouseEnter: (e) => {
      dispatch(setCursor("crosshair"));
    },
    onDblClick: useCallback(
      (e) => {
        console.log("Double click");
        if (!drawingProps?.feature) return;

        const { lng, lat } = e.lngLat;
        const feature = drawingProps.feature;
        const lastPoint = feature[0];
        const finalFeature = [...feature, [lng, lat], lastPoint];
        dispatch(setDrawingProps({ feature: finalFeature }));
        dispatch(setDrawMode(DRAW_MODES.FREE));
      },
      [drawingProps],
    ),
  };
}
