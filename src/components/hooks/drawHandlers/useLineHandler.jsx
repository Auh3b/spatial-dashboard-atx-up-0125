import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrawingProps, setDrawingProps } from "../../../store/mapStore";

export default function useLineHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
  // const [start, setStart] = useState(null)
  return {
    onClick: (e) => {},
    onMouseMove: () => {},
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
    onMouseEnter: (e) => {},
  };
}
