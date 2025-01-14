import { configureStore } from "@reduxjs/toolkit";
import mapStore from "./mapStore";

export const store = configureStore({
  reducer: {
    map: mapStore,
  },
});
