import { Box } from "@mui/material";
import { produce } from "immer";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { getLayers, updateLayer } from "../../../../../store/mapStore";
import { rgbaToDeckColor } from "../../../../../utils/colorUtils";
import AttributeWrapper from "../../../../common/AttributeWrapper";
import SingularColorPicker from "../../../../common/SingularColorPicker";
import useAllowedAttributes from "../hooks/useAllowedAttributes";

function RampColoPicker({ onColorChange, value }) {
  return <Box></Box>;
}

const attributeId = ATTRIBUTES.FILL_COLOR;

export default function ColorPicker({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const layers = useSelector((state) => getLayers(state));
  const layer = useMemo(() => {
    return layers[id];
  }, [id, layers]);
  const handleChange = useCallback(
    (color) => {
      const value = produce(layer, (draft) => {
        draft.legend.color = rgbaToDeckColor(color);
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );
  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={"fill"}>
          <SingularColorPicker
            onColorChange={handleChange}
            value={layer?.legend?.color}
          />
        </AttributeWrapper>
      )}
    </>
  );
}
