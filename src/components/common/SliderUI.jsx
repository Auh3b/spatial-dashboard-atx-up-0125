import { Grid2, Slider, Typography } from "@mui/material";
import React from "react";

export default function SliderUI({ value, ...rest }) {
  return (
    <Grid2 container gap={2} alignItems={"center"} wrap="nowrap">
      <Slider {...rest} size="small" value={value} sx={{ flexGrow: 1 }} />
      <Typography
        variant="caption"
        sx={{
          px: 1,
          py: 0,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}>
        {value}
      </Typography>
    </Grid2>
  );
}
