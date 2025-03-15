import Admin1Layer from "./Admin1Layer";
import Admin2Layer from "./Admin2Layer";
import CountriesLayer from "./CountriesLayer";
import DrawLayer from "./DrawLayer";
import SpatialFilterResultsLayer from "./SpatialFilterResultsLayer";

export const getExplorationLayers = () => [
  CountriesLayer(),
  Admin1Layer(),
  Admin2Layer(),
];

export const getDrawingLayers = () => [
  SpatialFilterResultsLayer(),
  DrawLayer(),
];
