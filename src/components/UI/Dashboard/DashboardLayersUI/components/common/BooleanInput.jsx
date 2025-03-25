import { Box, Checkbox, Grid2, Typography } from "@mui/material";
import React from "react";

export default function BooleanInput({ title, value, onChange }) {
  return (
    <Box>
      <Grid2 container alignItems={"center"}>
        <Grid2 flexGrow={1} sx={6}>
          <Typography variant='caption'>{title}</Typography>
        </Grid2>
        <Checkbox value={value} onChange={onChange} />
      </Grid2>
    </Box>
  );
}
