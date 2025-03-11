import { Landscape } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import { getViewState } from "../../../store/mapStore";

export default function MapNav() {
  const { current: map } = useMap();

  return (
    <Box
      sx={{
        position: "absolute",
        top: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
      }}>
      <Paper>
        <Grid2 container direction={"column"}>
          <ZoomInButton mapRef={map} />
          <Divider flexItem />
          <ZoomOutButton mapRef={map} />
          <Divider flexItem />
          <NorthArrowButton mapRef={map} />
          <Divider flexItem />
          <PitchButon mapRef={map} />
        </Grid2>
      </Paper>
      <PitchSlider mapRef={map} />
    </Box>
  );
}

function PitchButon({ mapRef }) {
  const viewState = useSelector((state) => getViewState(state));
  const [start, setStart] = useState(0);

  const handleDragStart = (e) => {
    setStart(e.clientY);
  };

  const handleDragEnd = () => {
    setStart(0);
  };

  const handleDrag = useCallback(
    (e) => {
      if (!mapRef || !viewState || !start) return;
      const drag = e.clientY;
      const delta = viewState.pitch + (start - drag) * 0.1;
      if (delta < 0 && delta > 60) return;
      mapRef.setPitch(delta);
    },
    [mapRef, viewState, start],
  );

  return (
    <>
      {start ? (
        <Box
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          sx={{
            position: "absolute",
            bottom: 153,
            height: "200px",
            left: -200,
            // bgcolor: red[500],
            zIndex: 100000,
            width: "400px",
            cursor: start ? "ns-resize" : "default",
          }}></Box>
      ) : null}
      <Tooltip
        placement="left"
        title={
          <Typography variant="caption">
            Drag and move to change pitch. Alternatively use hold the right
            mousebutton or hold Ctrl or CMD and mousedown to change pitch
          </Typography>
        }>
        <IconButton
          size="small"
          color="primary"
          disableRipple
          onMouseDown={handleDragStart}
          sx={{
            cursor: start ? "ns-resize" : "pointer",
          }}>
          <Landscape />
        </IconButton>
      </Tooltip>
    </>
  );
}

function PitchSlider({ mapRef }) {
  const viewState = useSelector((state) => getViewState(state));

  const handleChange = useCallback(
    (e, value) => {
      if (mapRef) return mapRef.setPitch(value);
    },
    [mapRef],
  );

  return (
    <Paper sx={{ px: 0.5, py: 2, mt: 1, height: 200 }}>
      <Slider
        sx={{ mx: "auto" }}
        onChange={handleChange}
        size="small"
        orientation="vertical"
        valueLabelDisplay="auto"
        valueLabelFormat={(x) => `${(x / 60) * 100}%`}
        value={viewState.pitch}
        min={0}
        max={60}
      />
    </Paper>
  );
}

function NorthArrowButton({ mapRef }) {
  const viewState = useSelector((state) => getViewState(state));
  const handleClick = useCallback(() => {
    if (mapRef) {
      mapRef.resetNorth();
      mapRef.resetNorthPitch();
    }
  }, [mapRef]);

  return (
    <IconButton
      size="small"
      color="primary"
      disableRipple
      onClick={handleClick}>
      <NavigationIcon
        sx={{
          transform: `rotate(${-viewState?.bearing ?? 0}deg)`,
        }}
      />
    </IconButton>
  );
}

function ZoomInButton({ mapRef }) {
  const handleClick = useCallback(() => {
    if (mapRef) mapRef.zoomIn();
  }, [mapRef]);
  return (
    <IconButton
      disableRipple
      size="small"
      color="primary"
      onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
}
function ZoomOutButton({ mapRef }) {
  const handleClick = useCallback(() => {
    if (mapRef) mapRef.zoomOut();
  }, [mapRef]);
  return (
    <IconButton
      disableRipple
      size="small"
      color="primary"
      onClick={handleClick}>
      <RemoveIcon />
    </IconButton>
  );
}
