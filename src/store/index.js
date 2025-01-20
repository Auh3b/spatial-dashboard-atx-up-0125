import { configureStore } from "@reduxjs/toolkit";
import mapStore, {
  getDrawingProps,
  getIsDrawing,
  getLayers,
  getSelectedLayer,
} from "./mapStore";
import appStore, { getData } from "./appStore";

export const store = configureStore({
  reducer: {
    app: appStore,
    map: mapStore,
  },
});

export const getFilteredParams = (state) => {
  const layer = getSelectedLayer(state);
  const source = getLayers(state)[layer]?.source || "";
  const sourceDetails = getData(state, source);
  const isDrawing = getIsDrawing(state);
  const coords = getDrawingProps(state);
  return {
    layer,
    source,
    ...sourceDetails,
    isDrawing,
    feature: coords
      ? {
          ...coords,
        }
      : null,
  };
};
