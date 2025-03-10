import { expose } from "comlink";
import { fetchData, getData, getFilteredData } from "./methods";
import { METHOD_NAMES } from "./methods/methodUtils";

const METHODS = {
  [METHOD_NAMES.FETCH_DATA]: fetchData,
  [METHOD_NAMES.GET_DATA]: getData,
  [METHOD_NAMES.GET_FILTERED_DATA]: getFilteredData,
};

const executeMethod = async (methodName, params) => {
  try {
    const method = METHODS[methodName];
    if (!method) throw new Error("Something went wrong");
    const result = await method(params);
    return result;
  } catch (error) {}
};

expose({ executeMethod });
