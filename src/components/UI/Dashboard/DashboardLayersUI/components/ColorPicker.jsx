import { Box, Grid2, Paper, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import { getLayers, updateLayer } from "../../../../../store/mapStore";

function SingularColorPicker({ onColorChange, value }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  return (
    <Box position={"relative"}>
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
        <Paper
          sx={{
            position: "absolute",
            top: 32,
            p: 1,
            zIndex: (theme) => theme.zIndex.modal,
          }}>
          <HexColorPicker value={value} onChange={onColorChange} />
        </Paper>
      )}
    </Box>
  );
}

function RampColoPicker({ onColorChange, value }) {
  return <Box></Box>;
}

export default function ColorPicker({ id }) {
  const dispatch = useDispatch();
  const layers = useSelector((state) => getLayers(state));
  const layer = useMemo(() => {
    return layers[id];
  }, [id, layers]);
  const handleChange = useCallback(
    (color) => {
      const value = produce(layer, (draft) => {
        draft.legend.color = color;
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );
  return (
    <Box sx={{ px: 1 }}>
      {layer?.legend?.type === "single" ? (
        <SingularColorPicker
          onColorChange={handleChange}
          value={layer?.legend?.color}
        />
      ) : (
        <RampColoPicker
          onColorChange={handleChange}
          value={layer?.legend?.color}
        />
      )}
    </Box>
  );
}
