import { bbox } from "@turf/turf";
import { WebMercatorViewport } from "deck.gl";
import { useCallback } from "react";
import { useMap } from "react-map-gl";

export default function useMapNavigation() {
  const { current: map } = useMap();
  const flyToFeature = useCallback(
    (feature) => {
      if (map) {
        const [minX, minY, maxX, maxY] = bbox(feature);
        const bounds = [
          [minX, minY],
          [maxX, maxY],
        ];
        const container = map.getContainer();
        const { clientWidth: width, clientHeight: height } = container;
        const viewpoint = new WebMercatorViewport();
        const { latitude, longitude, zoom } = viewpoint.fitBounds(bounds, {
          width,
          height,
          padding: 20,
        });
        map.flyTo({ zoom, center: [longitude, latitude] });
      }
    },
    [map],
  );
  return {
    flyToFeature,
  };
}
