import { Box, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import { rgbaToDeckColor } from "../../../../../utils/colorUtils";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import SingularColorPicker from "./common/SingularColorPicker";
import SliderUI from "./common/SliderUI";

const attributeId = ATTRIBUTES.STROKE;

export default function StrokeChanger({ id, type }) {
  const isAllowed = useAllowedAttributes(type, attributeId);
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
        draft.legend.strokeColor = rgbaToDeckColor(color);
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );

  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
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
        </AttributeWrapper>
      )}
    </>
  );
}

const staticStrokeWidthProps = {
  min: 0,
  step: 0.01,
  max: 5,
  size: "small",
  sx: {
    flexGrow: 1,
  },
};

function StrokeWidth({ onChange, value }) {
  return (
    <Box>
      <Typography variant="caption">Size</Typography>
      <SliderUI {...staticStrokeWidthProps} onChange={onChange} value={value} />
    </Box>
  );
}

function StrokeColor({ onColorChange, value }) {
  return <SingularColorPicker onColorChange={onColorChange} value={value} />;
}
