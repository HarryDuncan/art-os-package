import { hexToRgb } from "../../../../../utils/conversion/hexToRgb";

export const createColorVectorString = (
  hexColor: string,
  opacity?: boolean
) => {
  const colorVector = hexToRgb(hexColor);
  if (!colorVector) {
    console.warn("invalid color vector");
    return `vec4(1.0, 0.0, 0.0, ${opacity ? "opacity" : "1.0"})`;
  }
  return `vec4(${colorVector[0]}, ${colorVector[1]}, ${colorVector[2]}, ${
    opacity ? "opacity" : "1.0"
  })`;
};
