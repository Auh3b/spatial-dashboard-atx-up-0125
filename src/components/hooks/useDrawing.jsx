import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCursor,
  getDrawMode,
  setCursor,
  setDrawingProps,
  setDrawMode,
  setInteractivity,
} from "../../store/mapStore";
import useDrawHandlers from "./drawHandlers";
import { DRAW_MODES } from "../../utils/drawingUtils";

export default function useDrawing() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => getDrawMode(state));
  const cursor = useSelector((state) => getCursor(state));
  const handlers = useDrawHandlers();
  const disableInteraction = () => {
    dispatch(setDrawingProps(null));
    dispatch(
      setInteractivity({
        scrollZoom: false,
        boxZoom: false,
        dragRotate: false,
        dragPan: false,
        keyboard: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
        touchPitch: false,
      }),
    );
    dispatch(setCursor("crosshair"));
  };

  const enableInteraction = () => {
    dispatch(
      setInteractivity({
        scrollZoom: true,
        boxZoom: true,
        dragRotate: true,
        dragPan: true,
        keyboard: true,
        doubleClickZoom: true,
        touchZoomRotate: true,
        touchPitch: true,
      }),
    );
    dispatch(setCursor("auto"));
  };

  const setDrawingMode = (value) => {
    dispatch(setCursor("crosshair"));
    dispatch(setDrawMode(value));
  };

  const startDrawing = (value) => {
    dispatch(setCursor("auto"));
    setDrawingMode(value);
  };

  const stopDrawing = () => {
    dispatch(setDrawMode(DRAW_MODES.FREE));
  };

  useEffect(() => {
    if (mode === DRAW_MODES.FREE) {
      enableInteraction();
    } else {
      disableInteraction();
    }
  }, [mode]);

  return { cursor, mode, startDrawing, stopDrawing, handlers };
}
