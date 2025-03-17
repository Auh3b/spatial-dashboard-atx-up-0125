import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { drawingConfig } from "../data/layerConfig";
import { addLayer, removeLayer } from "../store/mapStore";
import Dashboard from "./UI/Dashboard";
import Header from "./UI/Header";

const drawLayer = drawingConfig;

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addLayer({ id: drawLayer.id, value: drawLayer }));
    return () => {
      dispatch(removeLayer({ id: drawLayer.id }));
    };
  });
  return (
    <Grid2
      container
      wrap="nowrap"
      direction={"column"}
      width={"100%"}
      height={"100%"}>
      <Header />
      <Dashboard />
    </Grid2>
  );
}
