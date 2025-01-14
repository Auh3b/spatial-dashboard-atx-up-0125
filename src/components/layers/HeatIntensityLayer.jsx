import { load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { HeatmapLayer } from "deck.gl";
import React, { useEffect, useState } from "react";
import { addLayer, removeLayer } from "../../store/mapStore";
import { useDispatch } from "react-redux";
const url =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";

const id = "heat-map-layer";
const name = "Heat Map Layer";
const colors = ["yellow", "red"];
const labels = ["Low", "High"];
const type = "ramp";

export default function HeatIntensityLayer() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await load(url, CSVLoader);
    const data = res.data;
    // @ts-ignore
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
