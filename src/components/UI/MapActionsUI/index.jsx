import { Box, Divider, Grid2 } from "@mui/material";
import React from "react";
import DrawTools from "../DrawTools";
import useDrawing from "../../hooks/useDrawing";
import SelectedFeatureUI from "./SelectedFeatureUI";
import useMapActionContext from "../../hooks/useMapActionContext";

export default function MapActionContextUI() {
  const { mode, startDrawing, stopDrawing } = useDrawing();
  useMapActionContext();
  return (
    <Box width={"100%"} height={48}>
      <Grid2 container direction={"column"}>
        <Grid2 container gap={2}>
          <Divider orientation="vertical" flexItem />
          <DrawTools mode={mode} onStart={startDrawing} onStop={stopDrawing} />
          <SelectedFeatureUI />
        </Grid2>
        <Divider orientation={"horizontal"} />
      </Grid2>
    </Box>
  );
}
