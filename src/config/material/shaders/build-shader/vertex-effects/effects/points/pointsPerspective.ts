import { PointPerspectiveConfig } from "../../vertexShader.types";
import { shaderSafeFloat } from "../../../helpers/safeParseValue";

export const pointsPerspective = (
  pointName: string,
  perspectiveConfig?: PointPerspectiveConfig
) => {
  if (perspectiveConfig) {
    const floor = shaderSafeFloat(perspectiveConfig.floor || 0.0);
    const max = shaderSafeFloat(perspectiveConfig.ceiling || 1.0);
    const scaleFactor = shaderSafeFloat(perspectiveConfig.scaleFactor || 1.0);
    const divisor = shaderSafeFloat(perspectiveConfig.divisor || 1.0);

    return `max(${floor}, min(${max}, ${scaleFactor} *  (${divisor} / abs(${pointName}.z))))`;
  }
  return "";
};
