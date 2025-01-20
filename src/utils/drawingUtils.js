import { makePoint, makePolygon } from "./geoFunc";

export const DRAW_MODES = {
  FREE: "free",
  POLYGON: "polygon",
  POINT: "point",
  LINE: "line",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
};

export const DRAWING_STATES = {
  IS_DRAWING: "isDrawing",
  NOT_DRAWING: "notDrawing",
};

export const featureHandler = {
  [DRAW_MODES.POINT]: makePoint,
  [DRAW_MODES.POLYGON]: makePolygon,
  [DRAW_MODES.CIRCLE]: makePolygon,
  [DRAW_MODES.RECTANGLE]: makePolygon,
};
