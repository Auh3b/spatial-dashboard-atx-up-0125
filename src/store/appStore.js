import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  feedback: {
    status: "",
    message: "",
  },
  data: {},
};

const appStore = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setData: (state, action) => {
      const { name, value } = action.payload;
      state.data[name] = value;
    },
    setBatchData: (state, action) => {
      const data = action.payload;
      if (data)
        data.forEach((d) => {
          state.data[d.name] = d;
        });
    },
  },
});

export const setDarkMode = () => ({
  type: "app/setDarkMode",
});

export const setFeedback = (payload) => ({
  type: "app/setFeedback",
  payload,
});

export const setData = (payload) => ({
  type: "app/setData",
  payload,
});

export const setBatchData = (payload) => ({
  type: "app/setBatchData",
  payload,
});

export const getDarkMode = (state) => state.app.darkMode;
export const getFeedback = (state) => state.app.feedback;
export const getData = (state, name) => state.app.data[name];
export const getAllData = (state) => state.app.data;

export default appStore.reducer;
