import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Dashboard from "./components/UI/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div
          className="app-container"
          style={{ width: "100vw", height: "100vh" }}>
          <Dashboard />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
