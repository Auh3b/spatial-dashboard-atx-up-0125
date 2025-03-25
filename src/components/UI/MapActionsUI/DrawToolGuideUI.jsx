import { Close, HelpOutline } from "@mui/icons-material";
import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDrawMode } from "../../../store/mapStore";

const instructions = {
  free: "If your seeing this, there's an error",
  point: "Click on the map to create a point.",
  circle: "Click and hold to draw a circle.  Release hold to finish drawing.",
  polygon: "Click on starting drawing polygon. Double-click to finish drawing.",
  rectangle:
    "Click and hold to draw a rectangle.  Release hold to finish drawing.s",
};

export default function DrawToolGuideUI() {
  const [open, setOpen] = useState(true);
  const drawMode = useSelector((state) => getDrawMode(state));
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (drawMode !== "free") {
      setOpen(true);
    }
    return () => handleClose();
  }, [drawMode]);

  return (
    <Box
      sx={{
        maxWidth: "50%",
        position: "absolute",
        top: 4,
        left: 4,
        display: open ? "block" : "none",
      }}
    >
      <Paper sx={{ p: 0.5 }}>
        <Grid2 container gap={1} alignItems={"center"}>
          <HelpOutline sx={{ fontSize: 12 }} />
          <Typography variant='caption'>{instructions[drawMode]}</Typography>
          <IconButton disableRipple onClick={handleClose}>
            <Close sx={{ fontSize: 12 }} />
          </IconButton>
        </Grid2>
      </Paper>
    </Box>
  );
}
