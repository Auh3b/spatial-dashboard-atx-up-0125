import { load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { HexagonLayer } from "deck.gl";
import React, { useEffect, useState } from "react";

const url =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";

export default function HexAggLayer() {
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
    return new HexagonLayer({
      id: "hexagon-layer",
      data: data,
      // @ts-ignore
      getPosition: (d) => Object.values(d),
      radius: 1000,
      elevationScale: 50,
      extruded: true,
      colorRange: [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78],
      ],
      pickable: true,
    });
}
