import { Box, Divider, Grid2 } from "@mui/material";
import React, { Fragment } from "react";
import DrawTools from "../DrawTools";
import useDrawing from "../../hooks/useDrawing";
import SelectedFeatureUI from "./SelectedFeatureUI";
import useMapActionContext from "../../hooks/useMapActionContext";
import ResetSelectionFeature from "./ResetSelectionFeature";

export default function MapActionContextUI() {
  const { layer } = useMapActionContext();
  return (
    <Fragment>
      {/* {Boolean(layer) && ( */}
      <Box width={"100%"} height={48}>
        <Grid2 container direction={"column"}>
          <Grid2
            container
            gap={2}
            justifyContent={"space-between"}
            wrap="nowrap">
            <DrawingToolbar />
            <SelectedFeatureUI />
            <ResetSelectionFeature />
          </Grid2>
          <Divider orientation={"horizontal"} />
        </Grid2>
      </Box>
      {/* )} */}
    </Fragment>
  );
}

function DrawingToolbar() {
  const { mode, startDrawing, stopDrawing } = useDrawing();
  return <DrawTools mode={mode} onStart={startDrawing} onStop={stopDrawing} />;
}
