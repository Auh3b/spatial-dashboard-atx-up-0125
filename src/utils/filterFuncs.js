export const FILTER_TYPES = {
  IN: "in",
};

export const FILTER_FUNCTIONS = {
  [FILTER_TYPES.IN]: filterIn,
};

export function filterIn(value, column) {
  return (d) => d[column] === value;
}
