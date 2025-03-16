import { Box, Checkbox, Grid2, Typography } from "@mui/material";
import React from "react";

export default function BooleanInput({ title, value, onChange }) {
  return (
    <Box>
      <Grid2 container alignItems={"center"}>
        <Grid2 flexGrow={1} size={6}>
          <Typography variant="caption">{title}</Typography>
        </Grid2>
        <Checkbox disableRipple checked={value} onChange={onChange} />
      </Grid2>
    </Box>
  );
}
