import { GeoJsonLayer } from "@deck.gl/layers";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer, removeLayer, setPopup } from "../../store/mapStore";
import { booleanIntersects, polygon } from "@turf/turf";
import { getData } from "../../store/appStore";
import useGeoWorker from "../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";

const id = "country-layer";
const name = "Country Layer";
const colors = ["red"];
const labels = ["Country"];
const type = "category";

const datasetName = "countries";

export default function CountriesLayer() {
  const overlay = useSelector((state) => state.map.drawingProps);
  const dispatch = useDispatch();

  const dataSet = useSelector((state) => getData(state, datasetName)) || {};
  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: dataSet,
  });

  // const getFilColor = useCallback(
  //   (feature) => {
  //     if (!overlay) return [200, 0, 0, 150];
  //     const overlayFeature = polygon([overlay.feature]);
  //     const intersected = booleanIntersects(feature, overlayFeature);
  //     if (!intersected) return [200, 0, 0, 150];
  //     return [62, 132, 201, 150];
  //   },
  //   [overlay],
  // );

  useEffect(() => {
    dispatch(
      addLayer({
        id,
        value: {
          id,
          name,
          source: datasetName,
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
  console.log(data);

  if (data)
    return new GeoJsonLayer({
      id,
      data,
      // getFillColor: (feature) => getFilColor(feature),
      getFillColor: [200, 0, 0, 100],
      getLineColor: [200, 0, 0],
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      onClick: ({ coordinate, object }) => {
        const [longitude, latitude] = coordinate;
        dispatch(
          setPopup({
            show: true,
            longitude,
            latitude,
            content:
              object.properties["name"] ||
              "If your seeing this, change the field value 😉",
          }),
        );
      },
      updateTriggers: {
        // getFillColor: overlay,
      },
    });
}
