import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import SliderUI from "./common/SliderUI";

const attributeId = ATTRIBUTES.RADIUS;
export default function RadiusChanger({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const { layer } = useLayerConfig(id);
  const handleChange = useCallback(
    (_e, radius) => {
      const value = produce(layer, (draft) => {
        draft.legend.radius = radius;
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
          <SliderUI
            min={5}
            max={15}
            value={layer?.legend?.radius}
            onChange={handleChange}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
