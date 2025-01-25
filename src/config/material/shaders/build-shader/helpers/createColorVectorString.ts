import { hexToRgb } from "../../../../../utils/conversion/hexToRgb";
import { shaderSafeFloat } from "../../../../../utils/conversion/shaderConversions";

export const createColorVectorString = (
  hexColor: string,
  opacity?: boolean
) => {
  const colorVector = hexToRgb(hexColor);
  if (!colorVector) {
    console.warn("invalid color vector");
    return `vec4(1.0, 0.0, 0.0, ${opacity ? "opacity" : "1.0"})`;
  }
  return `vec4(${shaderSafeFloat(colorVector[0])}, ${shaderSafeFloat(
    colorVector[1]
  )}, ${shaderSafeFloat(colorVector[2])}, ${opacity ? "opacity" : "1.0"})`;
};
