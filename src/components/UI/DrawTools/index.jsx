import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import useDrawing from "../../hooks/useDrawing";

export default function index() {
  const { mode, stopDrawing, startDrawing } = useDrawing();

  const handleChange = (_e, value) => {
    if (!value) return stopDrawing();
    startDrawing(value);
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
            value={""}
          />
          <CustomTab
            icon={<PlaceOutlinedIcon fontSize="small" />}
            value={"point"}
          />
          <CustomTab
            icon={<CircleOutlinedIcon fontSize="small" />}
            value={"polygon"}
          />
          <CustomTab
            icon={<CropSquareOutlinedIcon fontSize="small" />}
            value={"circle"}
          />
          <CustomTab
            icon={<TimelineOutlinedIcon fontSize="small" />}
            value={"linestring"}
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
