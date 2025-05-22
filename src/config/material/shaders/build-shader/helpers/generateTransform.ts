import { UniformConfig, TransformationConfig } from "../../../../../types";
import { safeParseValue, valueTypeToValue } from "./safeParseValue";

export const generateShaderTransformation = (
  config: TransformationConfig,
  uniforms: UniformConfig[]
) => {
  let transformation = config.prefix ?? "";

  if (config.singleInstance) {
    config.effectCode.forEach((line: string) => {
      let processedLine = line;

      transformation += processedLine + "\n";
    });
  } else {
    if (!config.allowedValueTypes) {
      console.warn(
        `No allowedValueTypes has been configured for ${config.effectName}`
      );
      return "";
    }
    const allowedUniforms = uniforms.filter((uniform) =>
      (config.allowedValueTypes as unknown as string[]).includes(
        uniform.valueType
      )
    );
    allowedUniforms.forEach((uniform, index) => {
      // Add instantiation
      transformation += `${valueTypeToValue(
        config.instantiationType || uniform.valueType
      )} ${config.instantiationName}_${index} = ${
        config.instantiationValue
      };\n`;

      // Process effect code
      config.effectCode.forEach((line: string) => {
        let processedLine = line;

        // Replace placeholders
        processedLine = processedLine.replace(/{{(\w+)}}/g, (match, key) => {
          if (key === "EFFECT") {
            return `${safeParseValue(
              uniform.id,
              uniform.valueType as string,
              config.instantiationType || uniform.valueType
            )}`;
          }
          return `${key}_${index}`;
        });

        transformation += processedLine + "\n";
      });
    });
  }

  return transformation;
};
