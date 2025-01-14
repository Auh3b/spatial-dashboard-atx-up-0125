import "./App.css";
import React from "react";
import MapWrapper from "./components/MapWrapper";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div
        className="app-container"
        style={{ width: "100vw", height: "100vh" }}>
        <MapWrapper />
      </div>
    </Provider>
  );
}

export default App;
