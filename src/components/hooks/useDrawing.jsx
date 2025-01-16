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
import { useMap } from "react-map-gl";
import useDrawHandlers from "./drawHandlers";
import { DRAW_MODES } from "../../utils/drawingUtils";

export default function useDrawing() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => getDrawMode(state));
  const cursor = useSelector((state) => getCursor(state));
  const handlers = useDrawHandlers();
  const disableInteraction = () => {
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
  };

  const setDrawingMode = (value) => {
    dispatch(setDrawMode(value));
  };

  const startDrawing = (value) => {
    setDrawingMode(value);
  };

  const stopDrawing = () => {
    dispatch(setDrawMode(DRAW_MODES.FREE));
  };

  const { current: map } = useMap();

  useEffect(() => {
    if (mode === DRAW_MODES.FREE) {
      enableInteraction();
    } else {
      disableInteraction();
    }
  }, [mode, cursor]);

  useEffect(() => {
    if (map) {
      map.getCanvas().style.cursor = cursor;
    }
    return () => {
      dispatch(setCursor("grab"));
    };
  }, [map, cursor]);

  return { mode, startDrawing, stopDrawing, handlers };
}
