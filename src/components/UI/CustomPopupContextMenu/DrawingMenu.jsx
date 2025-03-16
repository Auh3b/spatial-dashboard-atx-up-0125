import { Box, Typography } from "@mui/material";
import { format } from "d3";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPopup } from "../../../store/mapStore";
import { getRadius } from "../../../utils/geoFunc";
export default function DrawingMenu() {
  const popup = useSelector((state) => getPopup(state));

  const radius = useMemo(() => {
    if (popup.geometry !== "circle") return null;

    return getRadius(popup.feature);
  }, [popup]);

  return (
    <Box>
      {radius && (
        <Typography sx={{ px: 1 }}>
          Radius: {format(",.2f")(radius || 0 / 1000)} km
        </Typography>
      )}
    </Box>
  );
}
