import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import NumberInput from "./common/NumberInput";

const attributeId = ATTRIBUTES.HEATMAP;
export default function HeatMapAttrChanger({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const { layer } = useLayerConfig(id);

  const handleChange = useCallback(
    (attr) => {
      return (newValue) => {
        const value = produce(layer, (draft) => {
          draft.legend[attr] = +newValue;
        });
        dispatch(
          updateLayer({
            id,
            value,
          }),
        );
      };
    },
    [layer, id],
  );

  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <NumberInput
            title={"Intensity"}
            step={1}
            min={1}
            max={10}
            labelFormat=".0f"
            value={layer.legend.intensity}
            onChange={handleChange("intensity")}
          />
          <NumberInput
            title={"Threshold"}
            min={0}
            max={1}
            step={0.05}
            labelFormat=".2f"
            value={layer.legend.threshold}
            onChange={handleChange("threshold")}
          />
          <NumberInput
            title={"Radius Pixels"}
            step={10}
            min={10}
            max={100}
            labelFormat=".0f"
            value={layer.legend.radiusPixels}
            onChange={handleChange("radiusPixels")}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
