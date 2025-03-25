import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Grid2, IconButton, Typography } from "@mui/material";
import { format } from "d3";
import React, { useCallback } from "react";

export default function NumberInput({
  title,
  value,
  onChange,
  max,
  min,
  step,
  labelFormat = "r",
}) {
  const handleIncrement = useCallback(() => {
    const increment = value < max ? value + step : max;
    onChange(increment);
  }, [value, step, onChange]);
  const handleDecrement = useCallback(() => {
    const decrement = value > min ? value - step : min;
    onChange(decrement);
  }, [value, step, onChange]);
  return (
    <Grid2 container alignItems={"center"} gap={1} wrap="nowrap" sx={{ my: 1 }}>
      <Grid2 flexGrow={1}>
        <Typography variant="caption">{title}</Typography>
      </Grid2>
      <Grid2 container wrap="nowrap" gap={2}>
        <Grid2
          container
          alignSelf={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            p: 0.5,
            width: 32,
            height: 32,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
          <Typography variant="caption">
            {format(labelFormat)(value)}
          </Typography>
        </Grid2>
        <Grid2 container direction={"column"} alignItems={"center"}>
          <IconButton
            disableRipple
            sx={{ p: 0 }}
            size="small"
            onClick={handleIncrement}>
            <KeyboardArrowUp />
          </IconButton>
          <IconButton
            disableRipple
            sx={{ p: 0 }}
            size="small"
            onClick={handleDecrement}>
            <KeyboardArrowDown />
          </IconButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
