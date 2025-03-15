import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function DashboardHome({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Box sx={{ p: 1 }}>
          <Typography variant='h5' sx={{ mb: 2 }}>
            Dashboard dsasa
          </Typography>
          <Typography variant={"body2"}></Typography>
        </Box>
      )}
    </Fragment>
  );
}
