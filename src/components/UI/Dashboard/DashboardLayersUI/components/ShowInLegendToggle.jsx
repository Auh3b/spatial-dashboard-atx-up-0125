import React, { useCallback } from "react";
import BooleanInput from "./common/BooleanInput";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import { useDispatch } from "react-redux";
import { updateLayer } from "../../../../../store/mapStore";
import { produce } from "immer";

export default function ShowInLegendToggle({ id }) {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);

  const handleChange = useCallback(() => {
    const value = produce(layer, (draft) => {
      draft.showInLegend = !draft.showInLegend;
    });
    dispatch(
      updateLayer({
        id,
        value,
      })
    );
  }, [layer, id]);
  return (
    <BooleanInput
      title={"Show in legend"}
      value={layer.showInLegend}
      onChange={handleChange}
    />
  );
}
