import React, { Fragment, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLayers,
  getSelectedLayer,
  removeFilteredData,
  removeSelectedLayer,
  setDrawingProps,
  setSelectedLayer,
} from "../../../store/mapStore";
import { Box, Divider, Grid2, Typography } from "@mui/material";
import { zip } from "d3";

export default function DashboardLayersUI({ selected, index }) {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(() => Object.values(_layers), [_layers]);
  const selectedLayer = useSelector((state) => getSelectedLayer(state));
  return (
    <Fragment>
      {selected === index && (
        <Box>
          {Boolean(layers.length) &&
            layers.map((d) => (
              <LayerUI key={d.id} {...d} selected={selectedLayer} />
            ))}
        </Box>
      )}
    </Fragment>
  );
}

function LayerUI({ id, name, legend, selected }) {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    if (selected !== id) {
      dispatch(setSelectedLayer(id));
      return;
    }
    dispatch(removeFilteredData());
    dispatch(setDrawingProps(null));
    dispatch(removeSelectedLayer());
  }, [selected]);
  const isSelected = selected === id;
  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={handleClick}>
      <Grid2 container>
        <Grid2 container direction={"column"} sx={{ flexGrow: 1 }}>
          <Typography variant={"overline"} sx={{ pl: 1, fontSize: "0.65rem" }}>
            {name}
          </Typography>
          <Legend {...legend} />
        </Grid2>
        <Box
          sx={{
            width: 4,
            backgroundColor: (theme) =>
              isSelected ? theme.palette.primary.dark : "unset",
          }}
        />
      </Grid2>
      <Divider variant="vertical" />
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
