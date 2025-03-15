import { GeoJsonLayer } from "@deck.gl/layers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLayer,
  getIsDrawing,
  removeLayer,
  removePopup,
  setPopup,
} from "../../store/mapStore";
import { getData } from "../../store/appStore";
import useGeoWorker from "../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";

const id = "country-layer";
const name = "Country Layer";
const colors = ["#e7298a"];
const labels = ["Country"];
const type = "category";

const datasetName = "countries";

export default function CountriesLayer() {
  const dispatch = useDispatch();
  const isDrawing = useSelector((state) => getIsDrawing(state));
  const dataSet = useSelector((state) => getData(state, datasetName)) || {};
  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: dataSet,
  });

  // useEffect(() => {
  //   dispatch(
  //     addLayer({
  //       id,
  //       value: {
  //         id,
  //         name,
  //         source: datasetName,
  //         legend: {
  //           type,
  //           colors,
  //           labels,
  //         },
  //       },
  //     }),
  //   );

  //   return () => dispatch(removeLayer(id));
  // }, []);

  if (data)
    return new GeoJsonLayer({
      id,
      data,
      getFillColor: [231, 41, 138, 100],
      getLineColor: [231, 41, 138],
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      onDrag: isDrawing
        ? undefined
        : () => {
            dispatch(removePopup());
          },
      onClick: isDrawing
        ? undefined
        : ({ x, y, coordinate, object }, e) => {
            if (e.leftButton) dispatch(removePopup());
            if (
              e.rightButton ||
              (e.leftButton && e.changedPointers[0].ctrlKey)
            ) {
              const [longitude, latitude] = coordinate;
              dispatch(
                setPopup({
                  x,
                  y,
                  show: true,
                  longitude,
                  feature: object,
                  p_code: object.properties["adm0_a3"],
                  level: 0,
                  next_level: 1,
                  latitude,
                  content:
                    object.properties["name"] ||
                    "If your seeing this, change the field value 😉",
                })
              );
            }
          },
      updateTriggers: {
        onClick: isDrawing,
        onDrag: isDrawing,
      },
    });
}
