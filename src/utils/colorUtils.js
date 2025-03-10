import { color } from "d3";

export function hexToDeckColor(colorCode) {
  const colorUnit = color(colorCode);
  const { r, g, b } = colorUnit.rgb();
  return [r, g, b, 150];
}
