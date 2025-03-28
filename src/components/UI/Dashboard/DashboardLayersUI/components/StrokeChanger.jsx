import { Box } from "@mui/material";
import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import { rgbaToDeckColor } from "../../../../../utils/colorUtils";
import AttributeWrapper from "../../../../common/AttributeWrapper";
import NumberInput from "../../../../common/NumberInput";
import SingularColorPicker from "../../../../common/SingularColorPicker";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";

const attributeId = ATTRIBUTES.STROKE;

export default function StrokeChanger({ id, type, wrapperProps = {} }) {
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
        draft.legend.stroke = rgbaToDeckColor(color);
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );

  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId} {...wrapperProps}>
          <Box>
            <StrokeColor
              onColorChange={handleColorChange}
              value={layer.legend.stroke}
            />
            <StrokeWidth
              onChange={handleStrokeChange}
              value={layer.legend.strokeWidth}
            />
          </Box>
        </AttributeWrapper>
      )}
    </>
  );
}

function StrokeWidth({ onChange, value = 1 }) {
  return (
    <Box>
      <NumberInput
        title={"Size"}
        min={0}
        labelFormat=".1f"
        step={0.5}
        max={Infinity}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

function StrokeColor({ onColorChange, value }) {
  return <SingularColorPicker onColorChange={onColorChange} value={value} />;
}
