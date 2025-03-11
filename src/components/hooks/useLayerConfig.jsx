import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getLayers } from "../../store/mapStore";

export default function useLayerConfig(id) {
  const layers = useSelector((state) => getLayers(state));
  const layer = useMemo(() => {
    if (layers[id]) return layers[id];
  }, [layers, id]);
  const dataSources = useSelector((state) => state.app.data);
  const source = useMemo(() => {
    if (dataSources[id]) return dataSources[id];
    return null;
  }, [dataSources]);
  return {
    layer,
    source,
  };
}
