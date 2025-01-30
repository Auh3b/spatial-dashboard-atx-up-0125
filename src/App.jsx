import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { CssBaseline } from "@mui/material";
import Feedback from "./components/UI/Feedback";
import Layout from "./components/Layout";
import DataLoadingFeed from "./components/UI/DataLoadingFeed";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div
            className="app-container"
            style={{ width: "100vw", height: "100vh" }}>
            <Layout />
            <DataLoadingFeed />
            <Feedback />
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
