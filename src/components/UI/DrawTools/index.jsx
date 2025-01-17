import {
  Box,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import React from "react";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import PentagonOutlinedIcon from "@mui/icons-material/PentagonOutlined";
import { DRAW_MODES } from "../../../utils/drawingUtils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { setDrawingProps } from "../../../store/mapStore";

export default function index({ mode, onStart, onStop }) {
  const dispatch = useDispatch();
  const handleChange = (_e, value) => {
    if (value === DRAW_MODES.FREE) return onStop();
    onStart(value);
  };

  const handleFeatureDelete = () => {
    dispatch(setDrawingProps(null));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: (theme) => theme.spacing(2),
        left: (theme) => theme.spacing(2),
      }}>
      <Paper>
        <Grid2 container direction={"column"} alignItems={"center"}>
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
              icon={<PentagonOutlinedIcon fontSize="small" />}
              value={DRAW_MODES.POLYGON}
            />
            {/* <CustomTab
            icon={<TimelineOutlinedIcon fontSize="small" />}
            value={DRAW_MODES.LINE}
          /> */}
          </Tabs>
          <Divider orientation="horizontal" flexItem />
          <IconButton onClick={handleFeatureDelete}>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Grid2>
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
