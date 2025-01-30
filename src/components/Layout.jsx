import React, { Fragment } from "react";
import Dashboard from "./UI/Dashboard";
import { Grid2 } from "@mui/material";
import Header from "./UI/Header";

export default function Layout() {
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
