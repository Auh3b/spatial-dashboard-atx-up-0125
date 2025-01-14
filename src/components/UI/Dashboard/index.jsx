import { Grid2 } from "@mui/material";
import React from "react";
import DashboardPanel from "./DashboardPanel";
import MapWrapper from "../../MapWrapper";

export default function index() {
  return (
    <Grid2 container sx={{ width: "100%", height: "100%" }}>
      <DashboardPanel />
      <MapWrapper />
    </Grid2>
  );
}
