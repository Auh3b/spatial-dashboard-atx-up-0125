import { DRAW_MODES } from "../../../utils/drawingUtils";
import usePointHandler from "./usePointHandler";
import useCircleHandler from "./useCircleHandler";
import useLineHandler from "./useLineHandler";
import useRectangleHandler from "./useRectangleHandler";
import useFreeHandler from "./useFreeHandler";
import usePolygonHandler from "./usePolygonHandler";

export default function useDrawHandlers() {
  const handlers = {
    [DRAW_MODES.FREE]: useFreeHandler(),
    [DRAW_MODES.POINT]: usePointHandler(),
    [DRAW_MODES.CIRCLE]: useCircleHandler(),
    [DRAW_MODES.RECTANGLE]: useRectangleHandler(),
    [DRAW_MODES.LINE]: useLineHandler(),
    [DRAW_MODES.POLYGON]: usePolygonHandler(),
  };
  return handlers;
}
