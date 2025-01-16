import { useDispatch } from "react-redux";
import {
  setCursor,
  setDrawingProps,
  setDrawMode,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function usePointHandler() {
  const dispatch = useDispatch();
  return {
    onClick: (e) => {
      const { lng, lat } = e.lngLat;
      dispatch(setDrawingProps({ feature: [[lng, lat]] }));
    },
    onMouseMove: () => undefined,
    onMouseDown: () => undefined,
    onMouseUp: () => {
      dispatch(setDrawMode(DRAW_MODES.FREE));
    },
    onMouseEnter: (e) => {
      console.log(e.lngLat);
      dispatch(setCursor("crosshair"));
    },
  };
}
