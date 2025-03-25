import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopup, setPopup } from "../../../store/mapStore";

export default function useFreeHandler() {
  const dispatch = useDispatch();
  const popup = useSelector((state) => getPopup(state));

  return {
    onClick: noop,
    onMouseMove: noop,
    onMouseDown: useCallback(
      (_e) => {
        if (popup?.disableClickAway) return;
        dispatch(setPopup({ show: false }));
      },
      [popup]
    ),
    onMouseUp: noop,
    onMouseEnter: noop,
  };
}

function noop() {
  return undefined;
}
