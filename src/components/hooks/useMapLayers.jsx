import { dequal } from "dequal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLayers } from "../../store/mapStore";
import { derivedLayers } from "../../utils/layerUtils";
import useCompareEffect from "./useCompareEffect";

export default function useMapLayers() {
  const [layers, setLayers] = useState([]);
  const layerData = useSelector((state) => getLayers(state));
  useCompareEffect(
    () => {
      derivedLayers({ layerData })
        .then((data) => setLayers(data))
        .catch((error) => console.log(error));
    },
    [layerData],
    dequal,
  );

  return {
    layers,
  };
}
