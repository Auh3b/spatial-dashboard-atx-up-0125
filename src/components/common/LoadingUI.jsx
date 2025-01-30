import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingUI({ size = "16px", sxProps = {} }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sxProps,
      }}>
      <CircularProgress size={size} />
    </Box>
  );
}
