import { VERTEX_POINT_NAME } from "../../../../../../../../consts/materials/vertexEffects.consts";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../consts/materials/shader.consts";
import {
  UniformValueConfig,
  VertexTransformationConfig,
} from "../../../../../../../../types/materials/shaders/buildShader.types";

const explodeTransformConfig = {
  effectName: "explode",
  instantiationName: "displacedPosition",
  instantiationType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  instantiationValue: "vec3( ${VERTEX_POINT_NAME}.xy, 0)",
  allowedValueTypes: [
    SHADER_PROPERTY_VALUE_TYPES.VEC2,
    SHADER_PROPERTY_VALUE_TYPES.VEC3,
  ],
  effectCode: [
    `vec3 {{effectDistanceVector}} =  vec3{{EFFECT}} - {{displacedPosition}};`,
    `float {{effectDistanceLength}} = length({{effectDistanceVector}});`,
    `if({{effectDistanceLength}} <= uMinDistance * uStrength){`,
    `float {{effectDirection}} = sign({{effectDistanceVector}}.x);`,
    `if({{effectDirection}} == 0.0){`,
    `{{effectDirection}} = -1.0;`,
    `}`,
    `${VERTEX_POINT_NAME}.x +=  uStrength * {{effectDirection}};`,
    `${VERTEX_POINT_NAME}.y +=  uStrength * {{effectDirection}};`,
    `isAffected = 1.0;`,
    `}`,
  ],
} as unknown as VertexTransformationConfig;
export const explodeTransform = (uniforms: UniformValueConfig[]) => {
  const transformation = generateTransformation(
    explodeTransformConfig,
    uniforms
  );
  return transformation;
};

const generateTransformation = (
  config: VertexTransformationConfig,
  uniforms: UniformValueConfig[]
) => {
  let transformation = "";
  const allowedUniforms = uniforms.filter((uniform) =>
    (config.allowedValueTypes as unknown as string[]).includes(
      uniform.valueType
    )
  );

  allowedUniforms.forEach((uniform, index) => {
    // Add instantiation
    transformation += `${config.instantiationType} ${config.instantiationName}_${index} = ${config.instantiationValue};\n`;

    // Process effect code
    config.effectCode.forEach((line: string) => {
      let processedLine = line;

      // Replace placeholders
      processedLine = processedLine.replace(/{{(\w+)}}/g, (match, key) => {
        if (key === "EFFECT") {
          return `vec3(${safeParseValue(
            uniform.id,
            uniform.valueType,
            config.instantiationType
          )})`;
        }
        return `${key}_${index}`;
      });

      transformation += processedLine + "\n";
    });
  });

  return transformation;
};
function safeParseValue(
  id: string,
  valueType: string,
  instantiationType: string
): string {
  switch (valueType) {
    case "float":
      return `${instantiationType}(${id})`;
    case "vec2":
      return `vec3(${id}, 0.0)`;
    case "vec3":
      return `vec3(${id})`;
    case "vec4":
      return `vec3(${id}.xyz)`;
    default:
      throw new Error(`Unsupported value type: ${valueType}`);
  }
}
