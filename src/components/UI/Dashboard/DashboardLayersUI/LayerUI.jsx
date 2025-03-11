import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { zip } from "d3";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  removeFilteredData,
  removeLayer,
  removeSelectedLayer,
  setDrawingProps,
  setSelectedLayer,
} from "../../../../store/mapStore";
import ColorPicker from "./components/ColorPicker";
import CoordinateSelector from "./components/CoordinateSelector";
import HeatMapAttrChanger from "./components/HeatMapAttrChanger";
import HexAttrChanger from "./components/HexAttrChanger";
import NameChanger from "./components/NameChanger";
import RadiusChanger from "./components/RadiusChanger";
import ShapePicker from "./components/ShapePicker";
import StrokeChanger from "./components/StrokeChanger";

export default function LayerUI({
  id,
  name,
  selected,
  type,
  sourceType,
  source,
}) {
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

  const handleDelete = () => {
    dispatch(removeLayer({ id }));
  };

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
          }}>
          <Box sx={{ flexGrow: 1 }}>
            <NameChanger id={id} />
          </Box>
          <IconButton disableRipple onClick={handleClick}>
            {isSelected ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Grid2>
        <Collapse in={isSelected}>
          <Grid2 sx={{ p: 1 }}>
            <ShapePicker id={id} />
            <ColorPicker id={id} type={type} />
            <StrokeChanger id={id} type={type} />
            <CoordinateSelector
              id={id}
              type={type}
              sourceType={sourceType}
              source={source}
            />
            <RadiusChanger id={id} type={type} />
            <HexAttrChanger id={id} type={type} />
            <HeatMapAttrChanger id={id} type={type} />
            <Button
              onClick={handleDelete}
              size="small"
              variant="contained"
              color="error"
              startIcon={<Delete />}
              sx={{ mb: 1, ml: 1 }}>
              Delete Layer
            </Button>
          </Grid2>
        </Collapse>
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
