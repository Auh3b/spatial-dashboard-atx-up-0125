import React from "react";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";

const attributeId = ATTRIBUTES.ICON;
export default function IconAttrChanger({ id, type }) {
  const isAllowed = useAllowedAttributes(type, attributeId);
  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <div>RadiusChanger</div>
        </AttributeWrapper>
      )}
    </>
  );
}
