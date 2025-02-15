/**
 * @typedef {Object} LegendChildren
 * @property {string} name
 * @property {string | number} id
 */
/**
 *
 * @param {LegendChildren} children
 */
export function getLegendChildren(children) {
  const output = {};
  for (let i = 0; i < children.length; i++) {
    const { name, id } = children[i];
    output[id] = { name, id, visible: true };
  }

  return output;
}
