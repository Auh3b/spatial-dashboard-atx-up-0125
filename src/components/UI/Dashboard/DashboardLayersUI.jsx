import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getLayers } from "../../../store/mapStore";
import { Box, Divider, Grid2, Typography } from "@mui/material";
import { zip } from "d3";

export default function DashboardLayersUI() {
  const layers = useSelector((state) => getLayers(state));

  return <Box></Box>;
}

function LayerUI({ name }) {
  return (
    <Box>
      <Grid2 container direction={"column"}>
        <Typography variant={"caption"}>{name}</Typography>
        <Divider variant="vertical" flexItem />
      </Grid2>
    </Box>
  );
}

function Legend({ type, colors, label }) {
  return (
    <Box>
      <Typography>Key</Typography>
    </Box>
  );
}

function CategoryLegend({ colors, labels }) {
  const values = zip([colors, labels]);
  return (
    <Grid2 container direction={"column"}>
      {values.map(([color, label]) => (
        <Grid2 container gap={2} key={label}>
          <Box
            sx={{
              backgroundColor: color,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}></Box>
          <Typography>{label}</Typography>
        </Grid2>
      ))}
    </Grid2>
  );
}

function RampLegend({ colors, label }) {
  return (
    <Grid2 container direction={"column"}>
      <Grid2 container justifyContent={"space-between"}>
        {label.map((d) => (
          <Typography>d</Typography>
        ))}
      </Grid2>
      <Box
        width={"100%"}
        sx={{
          backgroundColor: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}></Box>
    </Grid2>
  );
}
