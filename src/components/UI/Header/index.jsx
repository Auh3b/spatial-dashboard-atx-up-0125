import { Box, Divider, Grid2, Typography } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Box>
      <Grid2 sx={{ px: 2, py: 1 }}>
        <Typography>Site Title</Typography>
      </Grid2>
      <Divider orientation="horizontal" />
    </Box>
  );
}
