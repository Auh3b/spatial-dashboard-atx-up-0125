import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getInitialLayerConfig } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import { LAYER_TYPE } from "../../../../../utils/layerUtils";
import useLayerConfig from "../../../../hooks/useLayerConfig";

const allowedShapes = [
  {
    label: "Point",
    value: LAYER_TYPE.POINT_LAYER,
  },
  {
    label: "Line",
    value: LAYER_TYPE.LINE_LAYER,
  },
  {
    label: "Polygon",
    value: LAYER_TYPE.POLYGON_LAYER,
  },
  {
    label: "Icon",
    value: LAYER_TYPE.ICON_LAYER,
  },
  {
    label: "Heat Map",
    value: LAYER_TYPE.HEATMAP_LAYER,
  },
  {
    label: "Hex Map",
    value: LAYER_TYPE.HEX_LAYER,
  },
];

export default function ShapePicker({ id }) {
  const dispatch = useDispatch();
  const { layer, source } = useLayerConfig(id);

  const handleChange = useCallback(
    (e) => {
      const value = getInitialLayerConfig(source, e.target.value);
      dispatch(updateLayer({ id, value }));
    },
    [source, id],
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
