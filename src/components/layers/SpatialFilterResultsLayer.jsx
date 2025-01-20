import { GeoJsonLayer } from "deck.gl";
import { useSelector } from "react-redux";
import { getFilteredData } from "../../store/mapStore";

export default function SpatialFilterResultsLayer() {
  const _data = useSelector((state) => getFilteredData(state));
  if (_data)
    return new GeoJsonLayer({
      data: _data.data,
      getFillColor: [52, 110, 235, 100],
      getLineColor: [52, 110, 235],
      getLineWidth: 2,
      lineWidthUnits: "pixels",
    });
}
