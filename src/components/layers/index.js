import CountriesLayer from "./CountriesLayer";
import DrawLayer from "./DrawLayer";
import EventsLayer from "./EventsLayer";
import HeatIntensityLayer from "./HeatIntensityLayer";
import HexAggLayer from "./HexAggLayer";
import SpatialFilterResultsLayer from "./SpatialFilterResultsLayer";

const layers = () => [
  CountriesLayer(),
  HeatIntensityLayer(),
  EventsLayer(),
  HexAggLayer(),
  SpatialFilterResultsLayer(),
  DrawLayer(),
];

export default layers;
