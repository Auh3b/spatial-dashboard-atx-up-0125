import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPopup } from "../../../store/mapStore";
import { getRadius } from "../../../utils/geoFunc";
export default function DrawingMenu() {
  const popup = useSelector((state) => getPopup(state));

  const radius = useMemo(() => {
    if (!popup.geometry === "circle") {
      return getRadius(popup.feature);
    }
    return null;
  }, popup);

  return (
    <Box>
      {radius && <Typography>Radius: {radius || 0 / 1000} km</Typography>}
    </Box>
  );
}
