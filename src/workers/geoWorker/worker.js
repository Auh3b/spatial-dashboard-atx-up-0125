import { expose } from "comlink";
import {
  fetchData,
  getData,
  getFilteredData,
  getUniqueColumnValues,
  setLocalData,
} from "./methods";
import { METHOD_NAMES } from "./methods/methodUtils";

const METHODS = {
  [METHOD_NAMES.FETCH_DATA]: fetchData,
  [METHOD_NAMES.GET_DATA]: getData,
  [METHOD_NAMES.GET_FILTERED_DATA]: getFilteredData,
  [METHOD_NAMES.SET_DATA]: setLocalData,
  [METHOD_NAMES.GET_UNIQUE_COLUMN_VALUES]: getUniqueColumnValues,
};

const executeMethod = async (methodName, params) => {
  try {
    const method = METHODS[methodName];
    if (!method) throw new Error("Something went wrong");
    const result = await method(params);
    return result;
  } catch (error) {
    console.log(error);
  }
};

expose({ executeMethod });
