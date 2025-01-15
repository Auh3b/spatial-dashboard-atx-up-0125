import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const appStore = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const setDarkMode = () => ({
  type: "app/setDarkMode",
});

export const getDarkMode = (state) => state.app.darkMode;

export default appStore.reducer;
