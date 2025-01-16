import React from "react";

export default function useFreeHandler() {
  return {
    onClick: noop,
    onMouseMove: noop,
    onMouseDown: noop,
    onMouseUp: noop,
    onMouseEnter: noop,
  };
}

function noop() {
  return undefined;
}
