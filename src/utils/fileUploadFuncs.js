import { parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { _GeoJSONLoader, JSONLoader } from "@loaders.gl/json";

export const FILE_TYPE = {
  CSV: "csv",
  GEOJSON: "geojson",
  JSON: "json",
  KMZ: "kmz",
};

export const LOADERS = {
  [FILE_TYPE.CSV]: CSVLoader,
  [FILE_TYPE.JSON]: JSONLoader,
  [FILE_TYPE.GEOJSON]: _GeoJSONLoader,
};

export const LOADER_OPTIONS = {
  [FILE_TYPE.CSV]: { csv: { header: true } },
};

export const allowedFiles = Object.values(FILE_TYPE);

/**
 *
 * @param {string} fileName
 * @returns {string}
 */
export const getFileExt = (fileName) => {
  return fileName.split(".").at(-1);
};

export const getLoader = (type, loaderOptions = {}) => {
  const loader = LOADERS[type];
  const options = {
    ...LOADER_OPTIONS[type],
    ...loaderOptions,
  };
  return {
    loader,
    options,
  };
};

export const parseUpload = async (data, type, loaderOptions = {}) => {
  const { loader, options } = getLoader(type, loaderOptions);
  const result = await parse(data, loader, options);
  return result;
};
