import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFilteredData,
  setDrawingProps,
  setDrawMode,
} from "../../../store/mapStore";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function ResetSelectionFeature() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setDrawMode(DRAW_MODES.FREE));
    dispatch(removeFilteredData());
    dispatch(setDrawingProps(null));
  };
  return (
    <Grid2 container alignItems={"center"} wrap="nowrap">
      <Typography variant="caption">reset</Typography>
      <IconButton onClick={handleClick}>
        <RestartAltIcon fontSize="small" />
      </IconButton>
    </Grid2>
  );
}
