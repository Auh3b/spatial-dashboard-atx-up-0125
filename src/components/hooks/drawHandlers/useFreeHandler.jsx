import { useDispatch } from "react-redux";
import { setPopup } from "../../../store/mapStore";

export default function useFreeHandler() {
  const dispatch = useDispatch();

  return {
    onClick: noop,
    onMouseMove: noop,
    onMouseDown: (_e) => {
      dispatch(setPopup({ show: false }));
    },
    onMouseUp: noop,
    onMouseEnter: noop,
  };
}

function noop() {
  return undefined;
}
