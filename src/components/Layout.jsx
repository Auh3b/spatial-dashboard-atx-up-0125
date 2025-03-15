import { Grid2 } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./UI/Dashboard";
import Header from "./UI/Header";

export default function Layout() {
  const dispatch = useDispatch();
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
