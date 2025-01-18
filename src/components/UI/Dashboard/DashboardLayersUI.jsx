import React, { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { getLayers } from "../../../store/mapStore";
import { Box, Divider, Grid2, Typography } from "@mui/material";
import { zip } from "d3";

export default function DashboardLayersUI({ selected, index }) {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(() => Object.values(_layers), [_layers]);
  return (
    <Fragment>
      {selected === index && (
        <Box>
          {Boolean(layers.length) &&
            layers.map((d) => <LayerUI key={d.id} {...d} />)}
        </Box>
      )}
    </Fragment>
  );
}

function LayerUI({ id, name, legend }) {
  return (
    <Box>
      <Grid2 container direction={"column"}>
        <Typography variant={"overline"} sx={{ pl: 1, fontSize: "0.65rem" }}>
          {name}
        </Typography>
        <Legend {...legend} />
        <Divider variant="vertical" flexItem />
      </Grid2>
    </Box>
  );
}

const LegendTypeUI = {
  category: CategoryLegend,
  ramp: RampLegend,
};

function Legend({ type, colors, labels }) {
  const LegendVisual = useMemo(() => LegendTypeUI[type], [type]);
  return (
    <Box p={1}>
      <Typography variant="caption">Key</Typography>
      <LegendVisual type={type} colors={colors} labels={labels} />
    </Box>
  );
}

function CategoryLegend({ colors, labels }) {
  const values = zip(labels, colors);
  return (
    <Grid2 container direction={"column"}>
      {values.map(([label, color]) => (
        <Grid2 container gap={2} key={label} alignItems={"center"}>
          <Box
            sx={{
              backgroundColor: color,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}></Box>
          <Typography variant="caption">{label}</Typography>
        </Grid2>
      ))}
    </Grid2>
  );
}

function RampLegend({ colors, labels }) {
  return (
    <Grid2 container direction={"column"}>
      <Grid2 container justifyContent={"space-between"}>
        {labels.map((d) => (
          <Typography key={d} variant="caption">
            {d}
          </Typography>
        ))}
      </Grid2>
      <Box
        width={"100%"}
        height={"10px"}
        sx={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}></Box>
    </Grid2>
  );
}
