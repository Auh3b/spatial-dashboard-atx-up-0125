import { load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { HeatmapLayer } from "deck.gl";
import React, { useEffect, useState } from "react";
const url =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";

export default function HeatIntensityLayer() {
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
