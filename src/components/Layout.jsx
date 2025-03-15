import React, { Fragment, useEffect } from "react";
import Dashboard from "./UI/Dashboard";
import { Grid2 } from "@mui/material";
import Header from "./UI/Header";
import {
  drawingLayers,
  exploreLayers,
  setBatchLayers,
} from "../data/layerConfig";
import { useDispatch } from "react-redux";

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    setBatchLayers(exploreLayers, dispatch);
    setBatchLayers(drawingLayers, dispatch);
  }, []);
  return (
    <Grid2
      container
      wrap='nowrap'
      direction={"column"}
      width={"100%"}
      height={"100%"}
    >
      <Header />
      <Dashboard />
    </Grid2>
  );
}
