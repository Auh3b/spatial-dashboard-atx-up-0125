import CountriesLayer from "./CountriesLayer";
import EventsLayer from "./EventsLayer";
import HeatIntensityLayer from "./HeatIntensityLayer";
import HexAggLayer from "./HexAggLayer";

const layers = () => [
  HexAggLayer(),
  HeatIntensityLayer(),
  EventsLayer(),
  CountriesLayer(),
];

export default layers;
