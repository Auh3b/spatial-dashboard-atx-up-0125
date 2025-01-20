import { createSlice } from "@reduxjs/toolkit";
import { DRAW_MODES } from "../utils/drawingUtils";

const INITIAL_VIEW_STATE = {
  longitude: -122.46940656246574,
  latitude: 37.7723322256912,
  zoom: 5,
  pitch: 0,
};

const initialState = {
  viewState: INITIAL_VIEW_STATE,
  selectedLayer: null,
  filteredData: null,
  layers: {},
  country: "",
  interactivity: {
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
  },
  popup: {
    show: false,
    latitude: INITIAL_VIEW_STATE.latitude,
    longitude: INITIAL_VIEW_STATE.longitude,
    content: "",
  },
  basemapUrl: "dark-v10",
  drawMode: DRAW_MODES.FREE,
  isDrawing: false,
  drawingProps: null,
  cursor: "default",
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
      if (state.layers[id]) delete state.layers[id];
    },
    updateLayer: (state, action) => {
      const { id, value } = action.payload;
      state.layers[id] = value;
    },
    setCountry: (state, action) => {
      const country = action.payload;
      state.country = country;
    },
    setPopup: (state, action) => {
      state.popup = {
        ...state.popup,
        ...action.payload,
      };
    },
    removePopup: (state) => {
      state.popup.show = false;
    },
    setBasemapUrl: (state, action) => {
      state.basemapUrl = action.payload;
    },
    setDrawMode: (state, action) => {
      state.drawMode = action.payload;
    },
    setDrawingProps: (state, action) => {
      state.drawingProps = action.payload;
    },

    setInteractivity: (state, action) => {
      state.interactivity = {
        ...state.interactivity,
        ...action.payload,
      };
    },
    setCursor: (state, action) => {
      state.cursor = action.payload;
    },
    setSelectedLayer: (state, action) => {
      state.selectedLayer = action.payload;
    },
    removeSelectedLayer: (state) => {
      state.selectedLayer = null;
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    removeFilteredData: (state) => {
      state.filteredData = null;
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

export const setPopup = (payload) => ({
  type: "map/setPopup",
  payload,
});

export const removePopup = () => ({
  type: "map/removePopup",
});

export const setBasemapUrl = (payload) => ({
  type: "map/setBasemapUrl",
  payload,
});

export const setDrawMode = (payload) => ({
  type: "map/setDrawMode",
  payload,
});

export const setDrawingProps = (payload) => ({
  type: "map/setDrawingProps",
  payload,
});

export const setInteractivity = (payload) => ({
  type: "map/setInteractivity",
  payload,
});

export const setCursor = (payload) => ({
  type: "map/setCursor",
  payload,
});

export const setSelectedLayer = (payload) => ({
  type: "map/setSelectedLayer",
  payload,
});

export const removeSelectedLayer = () => ({
  type: "map/removeSelectedLayer",
});

export const setIsDrawing = (payload) => ({
  type: "map/setIsDrawing",
  payload,
});

export const setFilteredData = (payload) => ({
  type: "map/setFilteredData",
  payload,
});

export const removeFilteredData = () => ({
  type: "map/removeFilteredData",
});

// Accessors

export const getViewState = (state) => {
  return state.map.viewState;
};

export const getLayers = (state) => {
  return state.map.layers;
};

export const getPopup = (state) => {
  return state.map.popup;
};

export const getBasemapUrl = (state) => {
  return state.map.basemapUrl;
};

export const getDrawMode = (state) => {
  return state.map.drawMode;
};

export const getDrawingProps = (state) => {
  return state.map.drawingProps;
};

export const getInteractivity = (state) => {
  return state.map.interactivity;
};

export const getCursor = (state) => {
  return state.map.cursor;
};

export const getSelectedLayer = (state) => {
  return state.map.selectedLayer;
};

export const getIsDrawing = (state) => {
  return state.map.isDrawing;
};

export const getFilteredData = (state) => {
  return state.map.filteredData;
};

export default mapStore.reducer;
