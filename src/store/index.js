import { configureStore } from "@reduxjs/toolkit";
import appStore from "./appStore";
import mapStore, {
  getDrawingProps,
  getIsDrawing,
  getLayers,
  getSelectedLayer,
} from "./mapStore";

export const store = configureStore({
  reducer: {
    app: appStore,
    map: mapStore,
  },
});

export const getFilteredParams = (state) => {
  const layerId = getSelectedLayer(state);
  const layer = getLayers(state)[layerId];
  const isDrawing = getIsDrawing(state);
  const coords = getDrawingProps(state);
  return {
    ...layer,
    isDrawing,
    feature: coords
      ? {
          ...coords,
        }
      : null,
  };
};
