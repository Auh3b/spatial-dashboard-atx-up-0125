import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import NumberInput from "./common/NumberInput";

const attributeId = ATTRIBUTES.HEX;
export default function HexAttrChanger({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const { layer } = useLayerConfig(id);
  const handleNumberChange = useCallback(
    (attr) => {
      return (e) => {
        const value = produce(layer, (draft) => {
          draft.legend[attr] = +e.target.value;
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
            value={layer.legend.elevationScale}
            onChange={handleNumberChange("elevationScale")}
          />
          <NumberInput
            title={"Radius"}
            value={layer.legend.radus}
            onChange={handleNumberChange("radius")}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
