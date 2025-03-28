import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import AttributeWrapper from "../../../../common/AttributeWrapper";
import NumberInput from "../../../../common/NumberInput";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";

const attributeId = ATTRIBUTES.HEX;
export default function HexAttrChanger({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const { layer } = useLayerConfig(id);
  const handleNumberChange = useCallback(
    (attr) => {
      return (newValue) => {
        const value = produce(layer, (draft) => {
          draft.legend[attr] = newValue;
        });
        dispatch(
          updateLayer({
            id,
            value,
          }),
        );
      };
    },
    [layer],
  );
  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <NumberInput
            title={"Elevation Scale"}
            min={5}
            step={5}
            max={Infinity}
            labelFormat=".0f"
            value={layer.legend.elevationScale || 1}
            onChange={handleNumberChange("elevationScale")}
          />
          <NumberInput
            title={"Radius"}
            min={50}
            step={50}
            max={Infinity}
            labelFormat=".0f"
            value={layer.legend.radius || 500}
            onChange={handleNumberChange("radius")}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
