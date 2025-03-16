import { useDispatch } from "react-redux";
import { setPopup } from "../../../store/mapStore";

export default function useFreeHandler() {
  const dispatch = useDispatch();

  return {
    onClick: (_e) => {
      dispatch(setPopup({ show: false }));
    },
    onMouseMove: noop,
    onMouseDown: noop,
    onMouseUp: noop,
    onMouseEnter: noop,
  };
}

function noop() {
  return undefined;
}
