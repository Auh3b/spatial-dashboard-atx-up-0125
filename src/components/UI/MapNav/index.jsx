import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavigationIcon from "@mui/icons-material/Navigation";
import React, { useCallback } from "react";
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
        <ButtonGroup
          variant="text"
          orientation="vertical"
          size="small"
          sx={{
            "& .MuiButtonGroup-groupedTextVertical": {
              borderColor: (theme) => theme.palette.divider,
            },
            "& .MuiButtonGroup-firstButton": {
              borderColor: (theme) => theme.palette.divider,
            },
            "& .MuiButtonGroup-middleButton": {
              borderColor: (theme) => theme.palette.divider,
            },
          }}>
          <ZoomInButton mapRef={map} />
          <ZoomOutButton mapRef={map} />
          <NorthArrowButton mapRef={map} />
        </ButtonGroup>
      </Paper>
    </Box>
  );
}

function NorthArrowButton({ mapRef }) {
  const viewState = useSelector((state) => getViewState(state));
  const handleClick = useCallback(() => {
    if (mapRef) mapRef.resetNorth();
  }, [mapRef]);

  return (
    <Button onClick={handleClick}>
      <NavigationIcon
        sx={{
          transform: `rotate(${-viewState?.bearing ?? 0}deg)`,
        }}
      />
    </Button>
  );
}

function ZoomInButton({ mapRef }) {
  const handleClick = useCallback(() => {
    if (mapRef) mapRef.zoomOut();
  }, [mapRef]);
  return (
    <Button onClick={handleClick}>
      <AddIcon />
    </Button>
  );
}
function ZoomOutButton({ mapRef }) {
  const handleClick = useCallback(() => {
    if (mapRef) mapRef.zoomIn();
  }, [mapRef]);
  return (
    <Button onClick={handleClick}>
      <RemoveIcon />
    </Button>
  );
}
