import { useDispatch } from "react-redux";
import {
  setDrawingProps,
  setDrawMode,
  setIsDrawing,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function usePointHandler() {
  const dispatch = useDispatch();
  return {
    onClick: (e) => undefined,
    onMouseMove: () => undefined,
    onMouseDown: () => {
      dispatch(setIsDrawing(true));
    },
    onMouseUp: (e) => {
      const { lng, lat } = e.lngLat;
      dispatch(setDrawingProps({ feature: [[lng, lat]] }));
      dispatch(setIsDrawing(false));
      dispatch(setDrawMode(DRAW_MODES.FREE));
    },
    onMouseEnter: (e) => {},
  };
}
