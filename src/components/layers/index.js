import Admin1Layer from "./Admin1Layer";
import Admin2Layer from "./Admin2Layer";
// import Admin3Layer from "./Admin3Layer";
import CountriesLayer from "./CountriesLayer";
import DrawLayer from "./DrawLayer";
import EventsLayer from "./EventsLayer";
import HeatIntensityLayer from "./HeatIntensityLayer";
import HexAggLayer from "./HexAggLayer";
import SpatialFilterResultsLayer from "./SpatialFilterResultsLayer";

const layers = () => [
  CountriesLayer(),
  Admin1Layer(),
  Admin2Layer(),
  // Admin3Layer(),
  HeatIntensityLayer(),
  EventsLayer(),
  HexAggLayer(),
  SpatialFilterResultsLayer(),
  DrawLayer(),
];

export default layers;
