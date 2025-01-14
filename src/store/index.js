import { configureStore } from "@reduxjs/toolkit";
import mapStore from "./mapStore";
import appStore from "./appStore";

export const store = configureStore({
  reducer: {
    app: appStore,
    map: mapStore,
  },
});
