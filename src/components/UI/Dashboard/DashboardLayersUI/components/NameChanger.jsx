import { Box, Input } from "@mui/material";
import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";

export default function NameChanger({ id }) {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);
  const handleChange = useCallback(
    (e) => {
      const value = produce(layer, (draft) => {
        draft.name = e.target.value;
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
  return (
    <Box sx={{ pl: 1 }}>
      <Input
        size="small"
        value={layer.name}
        onChange={handleChange}
        disableUnderline
        sx={{
          "& .Mui-focused": {
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </Box>
  );
}
