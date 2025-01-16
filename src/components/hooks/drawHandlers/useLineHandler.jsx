import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrawingProps, setDrawingProps } from "../../../store/mapStore";

export default function useLineHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
  // const [start, setStart] = useState(null)
  return {
    onClick: useCallback(
      (e) => {
        if (!drawingProps) return;
        const { lng, lat } = e.lngLat;
        dispatch(
          setDrawingProps({ feature: [...drawingProps.feature, [lng, lat]] }),
        );
      },
      [drawingProps],
    ),
    onMouseMove: useCallback(
      (e) => {
        if (!drawingProps) return;
        const { lng, lat } = e.lngLat;
        const feature = drawingProps.feature;
        const last_coord = feature.at(-1);

        dispatch(
          setDrawingProps({
            feature: [...feature, [[last_coord, [lng, lat]]]],
          }),
        );
      },
      [drawingProps],
    ),
    onMouseDown: () => undefined,
    onMouseUp: () => undefined,
    onMouseEnter: (e) => {
      dispatch(setCursor("crosshair"));
    },
  };
}
