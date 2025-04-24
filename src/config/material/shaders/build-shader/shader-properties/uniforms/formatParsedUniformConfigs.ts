import { hexToRgb } from "../../../../../../utils/conversion/hexToRgb";
import { arrayToVector } from "../../../../../../utils/conversion/conversion";
import { UniformConfig } from "../../../../../../types/materials/shaders/buildShader.types";

export const formatParsedUniformConfigs = (
  uniformConfig: UniformConfig
): UniformConfig => {
  const formattedCustomConfigs = uniformConfig.customUniforms?.map(
    (uniform) => {
      if (uniform.id.indexOf("Color") !== -1 && uniform.value !== undefined) {
        const colorValue = hexToRgb(uniform.value as string);
        if (colorValue) {
          return { ...uniform, value: arrayToVector(colorValue) };
        }
      }
      return {
        ...uniform,
      };
    }
  );
  return {
    ...uniformConfig,
    customUniforms: formattedCustomConfigs,
  };
};
