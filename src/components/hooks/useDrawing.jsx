import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrawMode,
  setDrawingProps,
  setDrawMode,
  setInteractivity,
} from "../../store/mapStore";
import { setFeedback } from "../../store/appStore";
import { useMap } from "react-map-gl";

export default function useDrawing() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => getDrawMode(state));
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
    disableInteraction();
    dispatch(
      setFeedback({ message: "Started Drawing Session", status: "info" }),
    );
  };

  const stopDrawing = () => {
    dispatch(setDrawMode(""));
    enableInteraction();
    dispatch(
      setFeedback({ message: "Stopped Drawing Session", status: "info" }),
    );
  };
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);

  const { current: map } = useMap();

  useEffect(() => {
    if (mode && map) {
      const canvas = map.getCanvas();
      canvas.setAttribute("cursor", "crosshar");
      canvas.addEventListener("mousedown", (event) => {
        const minX = event.clientX;
        const minY = event.clientY;
        const { lat, lng } = map.unproject([minX, minY]);
        setStartPoint([lng, lat]);
      });
      canvas.addEventListener("mousemove", (event) => {
        const maxX = event.clientX;
        const maxY = event.clientY;
        const { lat, lng } = map.unproject([maxX, maxY]);
        setCurrentPoint([lng, lat]);
      });
      canvas.addEventListener("mouseup", (event) => {
        const maxX = event.clientX;
        const maxY = event.clientY;
        const { lat, lng } = map.unproject([maxX, maxY]);
        setCurrentPoint([lng, lat]);
        stopDrawing();
      });
    }
  }, [mode, map]);

  useEffect(() => {
    if (startPoint && currentPoint)
      dispatch(
        setDrawingProps({
          feature: [startPoint, currentPoint],
        }),
      );
  }, [currentPoint, startPoint]);

  return { mode, startDrawing, stopDrawing };
}
