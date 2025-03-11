import { Box } from "@mui/material";
import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import { rgbaToDeckColor } from "../../../../../utils/colorUtils";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import NumberInput from "./common/NumberInput";
import SingularColorPicker from "./common/SingularColorPicker";

const attributeId = ATTRIBUTES.STROKE;

export default function StrokeChanger({ id, type }) {
  const isAllowed = useAllowedAttributes(type, attributeId);
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);
  const handleStrokeChange = useCallback(
    (stroke) => {
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
            <StrokeColor
              onColorChange={handleColorChange}
              value={layer.legend.strokeColor || "#962921"}
            />
            <StrokeWidth
              onChange={handleStrokeChange}
              value={layer.legend.strokeWidth || 0}
            />
          </Box>
        </AttributeWrapper>
      )}
    </>
  );
}

function StrokeWidth({ onChange, value }) {
  return (
    <Box>
      <NumberInput
        title={"Size"}
        min={0}
        labelFormat=".2f"
        step={0.5}
        max={10}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

function StrokeColor({ onColorChange, value }) {
  return <SingularColorPicker onColorChange={onColorChange} value={value} />;
}
