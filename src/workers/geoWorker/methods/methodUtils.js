import { CSVLoader } from "@loaders.gl/csv";
import { _GeoJSONLoader as GeoJSONLoader, JSONLoader } from "@loaders.gl/json";
import { KMLLoader } from "@loaders.gl/kml";

export const METHOD_NAMES = {
  FETCH_DATA: "fetchData",
  GET_DATA: "getData",
  GET_FILTERED_DATA: "getFilteredData",
  SET_DATA: "setData",
  GET_UNIQUE_COLUMN_VALUES: "getUniqueColumnValues",
};

export const LOADER_TYPE = {
  GEOJSON: "geojson",
  CSV: "csv",
  JSON: "json",
  KML: "kml",
};

export const loaders = {
  [LOADER_TYPE.CSV]: CSVLoader,
  [LOADER_TYPE.GEOJSON]: GeoJSONLoader,
  [LOADER_TYPE.JSON]: JSONLoader,
  [LOADER_TYPE.KML]: KMLLoader,
};
