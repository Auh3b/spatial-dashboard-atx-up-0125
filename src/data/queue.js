import { LOADER_TYPE } from "../workers/geoWorker/methods/methodUtils";

const queue = [
  {
    name: "countries",
    title: "Countries",
    url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson",
    type: LOADER_TYPE.GEOJSON,
  },
  {
    name: "united_kindom_clustering",
    title: "United Kingdom Clustering",
    url: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv",
    type: LOADER_TYPE.CSV,
  },
];

export default queue;
