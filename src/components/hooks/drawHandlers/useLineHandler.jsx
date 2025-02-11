import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrawingProps, setDrawingProps } from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function useLineHandler() {
  const dispatch = useDispatch();
  const drawingProps = useSelector((state) => getDrawingProps(state));
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
        feature = [...feature, [lng, lat]];
        dispatch(setDrawingProps({ feature, type: DRAW_MODES.LINE }));
      },
      [drawingProps],
    ),
    onMouseEnter: (e) => {},
  };
}
