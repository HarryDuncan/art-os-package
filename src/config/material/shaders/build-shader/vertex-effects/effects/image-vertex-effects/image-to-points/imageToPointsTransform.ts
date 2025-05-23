import { ShaderTransformationConfig } from "../../../../../../../../types/materials/index";
import { generateShaderTransformation } from "../../../../helpers/generateTransform";
import { VertexEffectProps } from "../../../vertexEffects.types";

const imageToPointsTransformConfig = {
  functionContent: [
    `vUv = uv;`, // move this as a varying declaration
    // double check that point position is correct
    // if there are issues it may be because you are passing in altered points
    `vec2 puv = {{pointPosition}}.xy / {{textureSize}};`,
    `vPUv = puv;`,
    // pixel color
    `vec4 colA = texture2D({{convertedTexture}}, puv);`,
    `float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;`,
    `vec3 displaced = {{pointOffset}};`,
    // randomise
    `displaced.xy += vec2(random({{pointIndex}}) - 0.5, random({{pointIndex}}) - 0.5) * {{randomDirection}};`,
    `float rndz = (random({{pointIndex}}) + noise(vec2({{pointIndex}} * 0.1, uTime * 0.1)));`,
    `displaced.z += rndz * (random({{pointIndex}}) * 2.0 * {{pointDepth}});`,
    // center
    `displaced.xy -= {{textureSize}} * 0.5;`,
    // particle size
    `float pSize = (noise(vec2(uTime, {{pointIndex}}) * 0.5) + 2.0);`,
    `float siz = 0.0;`,
    `if( grey < 0.9 )`,
    `{`,
    `siz = 12.4 ;`,
    `};`,
    `{{pointPosition}} =  vec4(displaced, 1.0);`,
    `pSize *= min(grey, siz);`,
    `pSize *= {{pointSize}};`,
    `gl_PointSize = pSize;`,
  ],
} as unknown as ShaderTransformationConfig;

export const imageToPoints = (effectProps: VertexEffectProps) => {
  const transformation = generateShaderTransformation(
    imageToPointsTransformConfig,
    effectProps
  );

  return {
    transformation,
  };
};
