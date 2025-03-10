import { Box, Grid2, Paper, Slider, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";

export default function StrokeChanger({ id }) {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);
  const handleStrokeChange = useCallback(
    (_e, stroke) => {
      const value = produce(layer, (draft) => {
        draft.legend.strokeWidth = stroke;
      });
      dispatch(
        updateLayer({
          id,
          value,
        }),
      );
    },
    [layer],
  );

  const handleColorChange = useCallback(
    (color) => {
      const value = produce(layer, (draft) => {
        draft.legend.strokeColor = color;
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );
  return (
    <Box>
      <StrokeWidth
        onChange={handleStrokeChange}
        value={layer.legend.strokeWidth || 0}
      />
      <StrokeColor
        onColorChange={handleColorChange}
        value={layer.legend.strokeColor || "#962921"}
      />
    </Box>
  );
}

const staticStrokeWidthProps = {
  min: 0,
  step: 0.01,
  max: 5,
  size: "small",
};

function StrokeWidth({ onChange, value }) {
  return (
    <Box sx={{ px: 1 }}>
      <Typography variant="caption">Size</Typography>
      <Slider {...staticStrokeWidthProps} onChange={onChange} value={value} />
    </Box>
  );
}

function StrokeColor({ onColorChange, value }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  return (
    <Box position={"relative"} sx={{ px: 1 }}>
      <Typography variant="caption">Color</Typography>
      <Grid2
        container
        alignItems={"center"}
        gap={2}
        sx={{
          px: 2,
          py: 1,
          "&:hover": {
            cursor: "pointer",
          },
          borderRadius: 0.5,
          border: (theme) => `${theme.palette.divider} 1px solid`,
        }}
        onClick={handleClick}>
        <Box sx={{ width: 10, height: 10, backgroundColor: value }} />
        <Typography variant="caption">{value}</Typography>
      </Grid2>
      {open && (
        <Paper sx={{ position: "absolute", top: 32, p: 1 }}>
          <HexColorPicker value={value} onChange={onColorChange} />
        </Paper>
      )}
    </Box>
  );
}
