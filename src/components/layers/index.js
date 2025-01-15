import CountriesLayer from "./CountriesLayer";
import DrawLayer from "./DrawLayer";
import EventsLayer from "./EventsLayer";
import HeatIntensityLayer from "./HeatIntensityLayer";
import HexAggLayer from "./HexAggLayer";

const layers = () => [
  CountriesLayer(),
  HeatIntensityLayer(),
  EventsLayer(),
  HexAggLayer(),
  DrawLayer(),
];

export default layers;
