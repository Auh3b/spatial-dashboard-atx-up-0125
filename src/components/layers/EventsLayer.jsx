// import { IconLayer } from "deck.gl";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addLayer, removeLayer } from "../../store/mapStore";

// const eventsData = [
//   { name: "Event 1", coordinates: [-122.4, 37.74], entries: 5, exits: 2 },
//   { name: "Event 2", coordinates: [-122.45, 37.75], entries: 3, exits: 1 },
//   { name: "Event 3", coordinates: [-122.5, 37.76], entries: 10, exits: 5 },
// ];

// const id = "events-layer";
// const name = "Events Layer";
// const colors = ["yellow"];
// const labels = ["Events"];
// const type = "category";

// export default function EventsLayer() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(
//       addLayer({
//         id,
//         value: {
//           id,
//           name,
//           legend: {
//             type,
//             colors,
//             labels,
//           },
//         },
//       }),
//     );

//     return () => dispatch(removeLayer(id));
//   }, []);

//   return new IconLayer({
//     id: "events-layer",
//     data: eventsData,
//     getColor: (d) => [Math.sqrt(d.exits) * 255, 140, 0],
//     getIcon: () => "marker",
//     getPosition: (d) => d.coordinates,
//     getSize: 40,
//     iconAtlas:
//       "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
//     iconMapping:
//       "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
//     pickable: true,
//     onClick: ({ object }) => alert(`Event clicked: ${object.name}`),
//   });
// }

import ComputerIcon from "@mui/icons-material/Computer";
import GroupIcon from "@mui/icons-material/Group";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { IconLayer } from "deck.gl";
import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server"; // To render Material UI Icons as SVG
import { useDispatch, useSelector } from "react-redux";
import {
  // addLayer,
  addLegend,
  getLegendItem,
  // removeLayer,
  removeLegend,
} from "../../store/mapStore";
import { getLegendChildren } from "../../utils/legendUtils";

// Event data with icon names
export const eventsData = [
  {
    id: "breaking-news",
    name: "Breaking News",
    latitude: 37.74,
    longitude: -122.4,
    icon: "newspaper",
  },
  {
    id: "terrorism",
    name: "Terrorism",
    latitude: 37.75,
    longitude: -122.45,
    icon: "explosion",
  },
  {
    id: "cyber-attack",
    name: "Cyber Attack",
    latitude: 37.76,
    longitude: -122.5,
    icon: "computer",
  },
  {
    id: "civil-unrest",
    name: "Civil Unrest",
    latitude: 37.77,
    longitude: -119.55,
    icon: "people",
  },
  {
    id: "natural-disaster",
    name: "Natural Disaster",
    latitude: 37.78,
    longitude: -120.6,
    icon: "fire_extinguisher",
  },
];

// Define custom colors for each event
const eventColors = {
  newspaper: "blue",
  explosion: "yellow",
  computer: "green",
  people: "orange",
  fire_extinguisher: "red",
};

// Function to convert Material UI Icon component to a base64 SVG string
const iconToDataUrl = (IconComponent, color) => {
  let svgString = ReactDOMServer.renderToStaticMarkup(<IconComponent />);
  svgString = svgString.replace(
    "<svg",
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="${color}"`,
  );
  svgString = svgString.replace("<path", `<path fill="${color}"`); // Apply fill color to the path
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const id = "events-layer";
const name = "Events";

// Events Layer
export default function EventsLayer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Add the layer to Redux store
    // Not need since if data is not stored in worker
    // dispatch(
    //   addLayer({
    //     id,
    //     value: {
    //       id,
    //       name,
    //       legend: {
    //         colors: [],
    //         labels: [],
    //       },
    //     },
    //   }),
    // );
    dispatch(
      addLegend({
        id,
        value: {
          id,
          name,
          visible: true,
          subs: {
            ...getLegendChildren(eventsData),
          },
        },
      }),
    );

    return () => {
      // dispatch(removeLayer(id));
      dispatch(removeLegend(id));
    }; // Clean up the layer on unmount
  }, [dispatch]);

  const { visible = true, subs = undefined } = useSelector((state) =>
    getLegendItem(state, id),
  );

  return new IconLayer({
    id: "events-layer",
    data: !subs ? eventsData : eventsData.filter(({ id }) => subs[id].visible),
    getColor: (d) => {
      const iconColor = eventColors[d.icon] || "blue"; // Default to blue if not found
      return iconColor === "blue"
        ? [0, 0, 255] // Blue
        : iconColor === "yellow"
        ? [255, 255, 0] // Yellow
        : iconColor === "green"
        ? [0, 255, 0] // Green
        : iconColor === "orange"
        ? [255, 165, 0] // Orange
        : [255, 0, 0]; // Red
    },
    getIcon: (d) => {
      const iconColor = eventColors[d.icon];
      switch (d.icon) {
        case "newspaper":
          return {
            url: iconToDataUrl(NewspaperIcon, iconColor),
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
        case "explosion":
          return {
            url: iconToDataUrl(ReportProblemIcon, iconColor),
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
        case "computer":
          return {
            url: iconToDataUrl(ComputerIcon, iconColor),
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
        case "people":
          return {
            url: iconToDataUrl(GroupIcon, iconColor),
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
        case "fire_extinguisher":
          return {
            url: iconToDataUrl(LocalFireDepartmentIcon, iconColor),
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
        default:
          return {
            url: "https://path-to-default-icon.svg", // Fallback icon
            width: 64,
            height: 64,
            anchorX: 32,
            anchorY: 32,
          };
      }
    },
    getPosition: (d) => d.coordinates,
    getSize: 40,
    iconAtlas: null,
    iconMapping: null,
    pickable: true,
    visible,
    onClick: ({ object }) => alert(`Event clicked: ${object.name}`),

    updateTriggers: {
      data: subs,
      visible: visible,
    },
  });
}
