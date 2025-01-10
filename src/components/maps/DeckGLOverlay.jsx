import { useControl } from "react-map-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";

export default function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}
