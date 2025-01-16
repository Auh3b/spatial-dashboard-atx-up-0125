import { MapMouseEvent } from "mapbox-gl";
export const DRAW_MODES = {
  FREE: "free",
  POINT: "point",
  LINE: "line",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
};

const drawPoint = {
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseUp: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
};

const drawRectange = {
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseDown: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseMove: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseUp: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
};

const drawCircle = {
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseDown: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseMove: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseUp: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
};

const drawLine = {
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseDown: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseMove: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
  /**
   *
   * @param {MapMouseEvent} e
   * @param { (value) => void } handleEvent
   */
  onMouseUp: (e, handleEvent) => {
    const { lat, lng } = e.lngLat;
    handleEvent([lng, lat]);
  },
};

export const drawingEvents = {
  [DRAW_MODES.POINT]: drawPoint,
  [DRAW_MODES.LINE]: drawLine,
  [DRAW_MODES.RECTANGLE]: drawRectange,
  [DRAW_MODES.CIRCLE]: drawCircle,
};
