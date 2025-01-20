import { CSVLoader } from "@loaders.gl/csv";
import { _GeoJSONLoader as GeoJSONLoader, JSONLoader } from "@loaders.gl/json";

export const METHOD_NAMES = {
  FETCH_DATA: "fetchData",
  GET_DATA: "getData",
  GET_FILTERED_DATA: "getFilteredData",
};

export const LOADER_TYPE = {
  GEOJSON: "geojson",
  CSV: "csv",
  JSON: "json",
};

export const loaders = {
  [LOADER_TYPE.CSV]: CSVLoader,
  [LOADER_TYPE.GEOJSON]: GeoJSONLoader,
  [LOADER_TYPE.JSON]: JSONLoader,
};
