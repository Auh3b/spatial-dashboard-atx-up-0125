import { LOADER_TYPE } from "../workers/geoWorker/methods/methodUtils";

function tabulateGeoJSON(value) {
  console.log(value);
  return value.features.map((d) => d.properties);
}

function tabulateNormal(value) {
  return value;
}

export const tabulationHandlers = {
  [LOADER_TYPE.CSV]: tabulateNormal,
  [LOADER_TYPE.JSON]: tabulateNormal,
  [LOADER_TYPE.GEOJSON]: tabulateGeoJSON,
  [LOADER_TYPE.KML]: tabulateGeoJSON,
};
