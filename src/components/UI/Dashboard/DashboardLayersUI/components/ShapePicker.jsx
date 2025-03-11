import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  allowedShapes,
  getInitialLayerConfig,
} from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";

export default function ShapePicker({ id }) {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);

  const handleChange = useCallback(
    (e) => {
      if (!e.target.value) return;
      const value = getInitialLayerConfig(id, layer.source, e.target.value);
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );

  return (
    <Box sx={{ px: 1 }}>
      <FormControl fullWidth size="small">
        <Select value={layer.type} onChange={handleChange}>
          {allowedShapes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
