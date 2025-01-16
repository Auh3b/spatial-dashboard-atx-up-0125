import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import { DRAW_MODES } from "../../../utils/drawingUtils";

export default function index({ mode, onStart, onStop }) {
  const handleChange = (_e, value) => {
    if (value === DRAW_MODES.FREE) return onStop();
    onStart(value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: (theme) => theme.spacing(2),
        left: (theme) => theme.spacing(2),
      }}>
      <Paper>
        <Tabs
          value={mode}
          onChange={handleChange}
          TabIndicatorProps={{
            sx: {
              display: "none",
            },
          }}
          orientation="vertical">
          <CustomTab
            icon={<PanToolOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.FREE}
          />
          <CustomTab
            icon={<PlaceOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.POINT}
          />
          <CustomTab
            icon={<CircleOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.CIRCLE}
          />
          <CustomTab
            icon={<CropSquareOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.RECTANGLE}
          />
          <CustomTab
            icon={<TimelineOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.LINE}
          />
        </Tabs>
      </Paper>
    </Box>
  );
}

function CustomTab(props) {
  return (
    <Tab
      {...props}
      sx={{
        minWidth: "unset",
        py: 1,
        px: 1.5,
        "& .Mui-Selected, & .MuiTab-icon": {
          color: "white",
        },
      }}
    />
  );
}
