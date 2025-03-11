import { useMemo } from "react";
import { attributeConfig } from "../../../../../data/layerConfig";

export default function useAllowedAttributes(type, attributeId) {
  const isAllowed = useMemo(
    () => attributeConfig[type].includes(attributeId),
    [type],
  );
  return isAllowed;
}
