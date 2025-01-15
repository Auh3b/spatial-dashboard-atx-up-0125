import { Box } from "@mui/material";
import React, { Fragment } from "react";

export default function DashboardHome({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Box sx={{ p: 1 }}>Welcome to this Dashboard!😁 '</Box>
      )}
    </Fragment>
  );
}
