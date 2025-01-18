import { useDispatch } from "react-redux";
import { setDrawingProps, setDrawMode } from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function usePointHandler() {
  const dispatch = useDispatch();
  return {
    onClick: (e) => undefined,
    onMouseMove: () => undefined,
    onMouseDown: () => undefined,
    onMouseUp: (e) => {
      const { lng, lat } = e.lngLat;
      dispatch(setDrawingProps({ feature: [[lng, lat]] }));
      dispatch(setDrawMode(DRAW_MODES.FREE));
    },
    onMouseEnter: (e) => {},
  };
}
