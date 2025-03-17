import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getFilteredParams } from "../../store";
import { getFilteredData } from "../../store/mapStore";
import {
  getLayerClass,
  getLayerProps,
  processGeojson,
} from "../../utils/layerUtils";

const color = [52, 110, 235, 100];
const stroke = [52, 110, 235, 255];
const id = "selected-results-layer";

export default function SpatialFilterResultsLayer() {
  const _data = useSelector((state) => getFilteredData(state));
  const targetLayer = useSelector((state) => getFilteredParams(state));
  const layer = useMemo(() => {
    if (_data && targetLayer && _data.requestor === targetLayer.id) {
      // const layerItem = getInitialLayerConfig(
      //   id,
      //   targetLayer.source,
      //   targetLayer.type,
      // );
      const layerProps = getLayerProps({
        ...targetLayer,
        deckId: id,
        legend: {
          ...targetLayer.legend,
          color,
          stroke,
        },
      });
      const data = ["geojson", "kml"].includes(targetLayer.source.type)
        ? processGeojson(_data.data)
        : _data.data;

      const layer = getLayerClass(targetLayer.type, data, layerProps);
      return layer;
    }
    return null;
  }, [_data, targetLayer]);

  if (layer) return layer;
  // return new GeoJsonLayer({
  //   data: _data.data,
  //   getFillColor: [52, 110, 235, 100],
  //   getLineColor: [52, 110, 235],
  //   getLineWidth: 2,
  //   lineWidthUnits: "pixels",
  // });
}
