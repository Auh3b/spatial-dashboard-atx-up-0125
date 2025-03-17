import { Grid2, MenuItem, Select, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  allowedShapes,
  getInitialLayerConfig,
} from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import AttributeWrapper from "./common/AttributeWrapper";

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
    <AttributeWrapper title={"Layer"}>
      <Grid2 container alignItems={"center"}>
        <Typography flexGrow={1} variant="caption">
          Type
        </Typography>
        <Select size="small" value={layer.type} onChange={handleChange}>
          {allowedShapes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Grid2>
    </AttributeWrapper>
  );
}
