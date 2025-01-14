import { GeoJsonLayer } from "@deck.gl/layers";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export default function CountriesLayer() {
  const country = useSelector((state) => state.map.country);

  const getFilColor = useCallback(
    (feature) => {
      if (!country) return [200, 0, 0, 150];
      const intersected = feature.properties["NAME_EN"] === country;
      if (!intersected) return [200, 0, 0, 150];
      return [62, 132, 201, 150];
    },
    [country],
  );

  return new GeoJsonLayer({
    id: "countries-layer",
    data: "src/data/countries.geojson",
    // getFillColor: [200, 0, 0, 150],
    getFillColor: (feature) => getFilColor(feature),
    getLineColor: [200, 0, 0],
    getLineWidth: 2,
    pickable: true,
    onClick: ({ object }) => {
      const centerPoint = center(object);
      setPopupInfo({
        longitude: centerPoint.geometry.coordinates[0],
        latitude: centerPoint.geometry.coordinates[1],
        name:
          object.properties["NAME_EN"] ||
          "If your seeing this, change the field value 😉",
      });
    },
    updateTriggers: {
      getFillColor: country,
    },
  });
}
