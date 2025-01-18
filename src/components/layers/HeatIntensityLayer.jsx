import { HeatmapLayer } from "deck.gl";
import { useEffect } from "react";
import { addLayer, removeLayer } from "../../store/mapStore";
import { useDispatch, useSelector } from "react-redux";
import useGeoWorker from "../hooks/useGeoWorker";
import { getData } from "../../store/appStore";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";

const id = "heat-map-layer";
const name = "Heat Map Layer";
const colors = ["yellow", "red"];
const labels = ["Low", "High"];
const type = "ramp";
const datasetName = "united_kindom_clustering";

export default function HeatIntensityLayer() {
  const dispatch = useDispatch();
  const dataSet = useSelector((state) => getData(state, datasetName)) || {};
  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: dataSet,
  });

  useEffect(() => {
    dispatch(
      addLayer({
        id,
        value: {
          id,
          name,
          legend: {
            type,
            colors,
            labels,
          },
        },
      }),
    );

    return () => dispatch(removeLayer(id));
  }, []);

  if (data)
    return new HeatmapLayer({
      id: "heat-map-layer",
      data,
      getPosition: (d) => Object.values(d),
      intensity: 1,
      threshold: 0.03,
      radiusPixels: 30,
    });
}
