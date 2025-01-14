import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  pitch: 0,
};

const initialState = {
  viewState: INITIAL_VIEW_STATE,
  layers: {},
  country: "",
};

const mapStore = createSlice({
  name: "map",
  initialState,
  reducers: {
    setViewState: (state, action) => {
      state.viewState = action.payload;
    },
    addLayer: (state, action) => {
      const { id, value } = action.payload;
      if (!state.layers[id]) {
        state.layers[id] = value;
      }
    },
    removeLayer: (state, action) => {
      const { id, value } = action.payload;
      if (!state.layers[id]) return true;
      delete state.layers[id];
    },
    updateLayer: (state, action) => {
      const { id, value } = action.payload;
      state.layers[id] = value;
    },
    setCountry: (state, action) => {
      const country = action.payload;
      state.country = country;
    },
  },
});

// Actions
export const setViewState = (payload) => ({
  type: "map/setViewState",
  payload,
});

export const addLayer = (payload) => ({
  type: "map/addLayer",
  payload,
});

export const removeLayer = (payload) => ({
  type: "map/removeLayer",
  payload,
});
export const updateLayer = (payload) => ({
  type: "map/updateLayer",
  payload,
});

// Accessors

export const getViewState = (state) => {
  return state.map.viewState;
};

export const getLayers = (state) => {
  return state.map.layers;
};

export default mapStore.reducer;
