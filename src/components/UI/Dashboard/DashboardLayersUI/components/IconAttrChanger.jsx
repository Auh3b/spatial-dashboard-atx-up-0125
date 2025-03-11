import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import NumberInput from "./common/NumberInput";
import TextInput from "./common/TextInput";

const attributeId = ATTRIBUTES.ICON;
export default function IconAttrChanger({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const { layer } = useLayerConfig(id);
  const handleChange = useCallback(
    (attr) => {
      return (e) => {
        const value = produce(layer, (draft) => {
          draft.legend[attr] = e.target.value;
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
  const handleSizeChange = useCallback(
    (size) => {
      const value = produce(layer, (draft) => {
        draft.legend.size = size;
      });
      dispatch(
        updateLayer({
          id,
          value,
        }),
      );
    },
    [layer, id],
  );
  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <TextInput
            title={"Icon"}
            value={layer.legend.icon || ""}
            onChange={handleChange("icon")}
          />
          <NumberInput
            title={"Icon Size"}
            min={5}
            step={10}
            max={Infinity}
            labelFormat=".0f"
            value={layer.legend.size || 5}
            onChange={handleSizeChange}
          />
          <TextInput
            title={"Icon Atlas"}
            value={layer.legend.iconAtlas || ""}
            onChange={handleChange("iconAtlas")}
          />
          <TextInput
            title={"Icon Mapping"}
            value={layer.legend.iconMapping || ""}
            onChange={handleChange("iconMapping")}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
