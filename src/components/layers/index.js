import CountriesLayer from "./CountriesLayer";
import EventsLayer from "./EventsLayer";
import HeatIntensityLayer from "./HeatIntensityLayer";
import HexAggLayer from "./HexAggLayer";

const layers = () => [
  CountriesLayer(),
  HeatIntensityLayer(),
  EventsLayer(),
  HexAggLayer(),
];

export default layers;
