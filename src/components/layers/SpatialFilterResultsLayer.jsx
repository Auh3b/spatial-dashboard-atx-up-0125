import { dequal } from "dequal";
import { useState } from "react";
import { STATIC_LAYER_NAMES } from "../../data/layerConfig";
import {
  getLayerClass,
  getLayerProps,
  processGeojson,
} from "../../utils/layerUtils";
import geoWorker from "../../workers/geoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import useCompareEffect from "../hooks/useCompareEffect";
import useLayerConfig from "../hooks/useLayerConfig";

const id = STATIC_LAYER_NAMES.OVERLAY_RESULTS_LAYER;

export default function SpatialFilterResultsLayer() {
  const [layerClass, setLayerClass] = useState(null);
  const { layer: layerItem } = useLayerConfig(id);

  useCompareEffect(
    () => {
      (async function () {
        if (layerItem) {
          const layerProps = getLayerProps(layerItem);
          const { data: _data } = await geoWorker({
            name: METHOD_NAMES.GET_FILTERED_DATA,
            params: layerItem,
          });

          const data = ["geojson", "kml"].includes(layerItem.source.type)
            ? processGeojson(_data)
            : _data;
          const layer = getLayerClass(layerItem.type, data, layerProps);
          setLayerClass(layer);
        }
      })();

      return setLayerClass(null);
    },
    [layerItem],
    dequal,
  );

  if (layerClass) return layerClass;
}
