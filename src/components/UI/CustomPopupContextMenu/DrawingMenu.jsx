import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { getPopup } from "../../../store/mapStore";
import { getRadius } from "../../../utils/geoFunc";
export default function DrawingMenu() {
  const popup = useSelector((state) => getPopup(state));
  const handleClick = useCallback(async () => {
    navigator.clipboard.writeText(popup.feature);
  }, [popup]);

  const radius = useMemo(() => {
    if (!popup.geometry === "circle") {
      return getRadius(popup.feature);
    }
    return null;
  }, popup);

  return (
    <Box>
      {radius && <Typography>Radius: {radius || 0 / 1000} km</Typography>}
      <Button
        onClick={handleClick}
        sx={{ px: 1, borderRadius: 0, textTransform: "capitalize" }}
        size="small"
        startIcon={<ContentCopyRoundedIcon />}>
        Copy features
      </Button>
    </Box>
  );
}
