import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  feedback: {
    status: "",
    message: "",
  },
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
  },
});

export const setDarkMode = () => ({
  type: "app/setDarkMode",
});

export const setFeedback = (payload) => ({
  type: "app/setFeedback",
  payload,
});

export const getDarkMode = (state) => state.app.darkMode;
export const getFeedback = (state) => state.app.feedback;

export default appStore.reducer;
