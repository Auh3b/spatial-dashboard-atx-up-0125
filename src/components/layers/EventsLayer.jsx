import { IconLayer } from "deck.gl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLayer, removeLayer } from "../../store/mapStore";

const eventsData = [
  { name: "Event 1", coordinates: [-122.4, 37.74], entries: 5, exits: 2 },
  { name: "Event 2", coordinates: [-122.45, 37.75], entries: 3, exits: 1 },
  { name: "Event 3", coordinates: [-122.5, 37.76], entries: 10, exits: 5 },
];

const id = "events-layer";
const name = "Events Layer";
const colors = ["yellow"];
const labels = ["Events"];
const type = "category";

export default function EventsLayer() {
  const dispatch = useDispatch();
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

  return new IconLayer({
    id: "events-layer",
    data: eventsData,
    getColor: (d) => [Math.sqrt(d.exits) * 255, 140, 0],
    getIcon: () => "marker",
    getPosition: (d) => d.coordinates,
    getSize: 40,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
    pickable: true,
    onClick: ({ object }) => alert(`Event clicked: ${object.name}`),
  });
}
