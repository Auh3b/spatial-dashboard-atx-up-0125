import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrawingProps, setDrawingProps } from "../../../store/mapStore";

export default function usePolygonHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
  // const [start, setStart] = useState(null)
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
        console.log(feature);
        feature = [...feature, [lng, lat]];
        dispatch(setDrawingProps({ feature }));
      },
      [drawingProps],
    ),
    onMouseEnter: (e) => {
      dispatch(setCursor("crosshair"));
    },
  };
}
