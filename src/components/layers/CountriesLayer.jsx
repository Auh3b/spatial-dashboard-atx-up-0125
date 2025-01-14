import { GeoJsonLayer } from "@deck.gl/layers";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer, removeLayer, setPopup } from "../../store/mapStore";
import { center } from "@turf/turf";

const id = "country-layer";
const name = "Country Layer";
const colors = ["red"];
const labels = ["Country"];
const type = "category";

export default function CountriesLayer() {
  const country = useSelector((state) => state.map.country);
  const dispatch = useDispatch();

  const getFilColor = useCallback(
    (feature) => {
      if (!country) return [200, 0, 0, 150];
      const intersected = feature.properties["NAME_EN"] === country;
      if (!intersected) return [200, 0, 0, 150];
      return [62, 132, 201, 150];
    },
    [country],
  );

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

  return new GeoJsonLayer({
    id,
    data: "src/data/countries.geojson",
    getFillColor: (feature) => getFilColor(feature),
    getLineColor: [200, 0, 0],
    getLineWidth: 2,
    pickable: true,
    onClick: ({ object }) => {
      const centerPoint = center(object);
      dispatch(
        setPopup({
          longitude: centerPoint.geometry.coordinates[0],
          latitude: centerPoint.geometry.coordinates[1],
          name:
            object.properties["NAME_EN"] ||
            "If your seeing this, change the field value 😉",
        }),
      );
    },
    updateTriggers: {
      getFillColor: country,
    },
  });
}
