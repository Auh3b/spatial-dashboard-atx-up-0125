import { load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { HexagonLayer } from "deck.gl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer, removeLayer } from "../../store/mapStore";
import useGeoWorker from "../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import { getData } from "../../store/appStore";

const id = "hex-layer";
const name = "Hexgon Layer";
const colors = ["#0198bd", "#d1374e"];
const labels = ["Low", "High"];
const type = "ramp";
const datasetName = "united_kindom_clustering";
export default function HexAggLayer() {
  const dispatch = useDispatch();
  const dataSet = useSelector((state) => getData(state, datasetName)) || {};
  const { isLoading, data } = useGeoWorker({
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

  if (data && !isLoading)
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
