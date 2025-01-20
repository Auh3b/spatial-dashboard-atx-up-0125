import { Tab, Tabs } from "@mui/material";
import React from "react";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import PentagonOutlinedIcon from "@mui/icons-material/PentagonOutlined";
import { DRAW_MODES } from "../../../utils/drawingUtils";
import { useDispatch } from "react-redux";
import { setDrawingProps } from "../../../store/mapStore";

export default function DrawTools({ mode, onStart, onStop }) {
  const dispatch = useDispatch();
  const handleChange = (_e, value) => {
    if (value === DRAW_MODES.FREE) return onStop();
    onStart(value);
  };

  const handleFeatureDelete = () => {
    dispatch(setDrawingProps(null));
  };

  return (
    <Tabs
      value={mode}
      onChange={handleChange}
      TabIndicatorProps={{
        sx: {
          display: "none",
        },
      }}
      sx={{
        width: "auto",
      }}
      orientation={"horizontal"}>
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
    </Tabs>
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
