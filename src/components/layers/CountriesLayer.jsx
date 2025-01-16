import { GeoJsonLayer } from "@deck.gl/layers";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer, removeLayer, setPopup } from "../../store/mapStore";
import { booleanIntersects } from "@turf/turf";

const id = "country-layer";
const name = "Country Layer";
const colors = ["red"];
const labels = ["Country"];
const type = "category";

export default function CountriesLayer() {
  const overlay = useSelector((state) => state.map.drawingProps);
  const dispatch = useDispatch();

  // const getFilColor = useCallback(
  //   (feature) => {
  //     if (!overlay) return [200, 0, 0, 150];
  //     const intersected = booleanIntersects(feature, overlay.feature);
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
          legend: {
            type,
            colors,
            labels,
          },
        },
      })
    );

    return () => dispatch(removeLayer(id));
  }, []);

  return new GeoJsonLayer({
    id,
    data: "src/data/countries.geojson",
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
            object.properties["NAME_EN"] ||
            "If your seeing this, change the field value 😉",
        })
      );
    },
    // updateTriggers: {
    //   getFillColor: overlay,
    // },
  });
}
