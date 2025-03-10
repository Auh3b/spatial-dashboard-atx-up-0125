import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, Divider, Grid2, Typography } from "@mui/material";
import { zip } from "d3";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  removeFilteredData,
  removeSelectedLayer,
  setDrawingProps,
  setSelectedLayer,
} from "../../../../store/mapStore";
import ColorPicker from "./components/ColorPicker";
import ShapePicker from "./components/ShapePicker";
import StrokeChanger from "./components/StrokeColor";

export default function LayerUI({ id, name, selected }) {
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
    <Box>
      <Grid2 container direction={"column"}>
        <Grid2
          container
          alignItems={"center"}
          sx={{
            backgroundColor: (theme) =>
              isSelected ? theme.palette.action.hover : "unset",
            py: 1,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleClick}>
          <Typography
            variant={"overline"}
            sx={{ pl: 1, fontSize: "0.65rem", flexGrow: 1 }}>
            {name}
          </Typography>
          {isSelected ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Grid2>
        <Collapse in={isSelected}>
          <Grid2 sx={{ p: 1 }}>
            <AttributeWrapper title={"Shape"}>
              <ShapePicker id={id} />
            </AttributeWrapper>
            <AttributeWrapper title={"Fill"}>
              <ColorPicker id={id} />
            </AttributeWrapper>
            <AttributeWrapper title={"Stroke"}>
              <StrokeChanger id={id} />
            </AttributeWrapper>
            {/* <Legend {...legend} /> */}
          </Grid2>
        </Collapse>
      </Grid2>
      <Divider variant="vertical" />
    </Box>
  );
}

function AttributeWrapper({ title, children }) {
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="subtitle2" sx={{ fontSize: 12, mb: 1 }}>
        {title}
      </Typography>
      {children}
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
    <Box px={1}>
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
