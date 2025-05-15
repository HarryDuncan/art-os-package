import {
  UniformValueConfig,
  TransformationConfig,
} from "../../../../../../../../types/materials/index";
import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
import { generateShaderTransformation } from "../../../../helpers/generateTransform";

const imageToPointsTransformConfig = {
  effectName: "imageToPoints",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [
    `vUv = uv;`,
    `vec2 puv = position.xy / uTextureSize;`,
    `vPUv = puv;`,

    // pixel color
    `vec4 colA = texture2D(uTexture, puv);`,
    `float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;`,
    `vec3 displaced = pointOffset;`,
    // randomise
    `displaced.xy += vec2(random(pointIndex) - 0.5, random(pointOffset.x + pointIndex) - 0.5) * uRandom;`,
    `float rndz = (random(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));`,
    `displaced.z += rndz * (random(pointIndex) * 2.0 * uDepth);`,
    // center
    `displaced.xy -= uTextureSize * 0.5;`,
    // particle size
    `float pSize = (noise(vec2(uTime, pointIndex) * 0.5) + 2.0);`,
    `float siz = 0.0;`,
    `if( grey < 0.9 )`,
    `{`,
    `siz = 12.4 ;`,
    `};`,
    `${VERTEX_POINT_NAME} =  vec4(displaced, 1.0);`,
    `pSize *= min(grey, siz);`,
    `pSize *= uSize;`,
    `gl_PointSize = pSize;`,
  ],
} as unknown as TransformationConfig;

export const imageToPointsTransform = (
  effectUniforms: UniformValueConfig[]
) => {
  const transformation = generateShaderTransformation(
    imageToPointsTransformConfig,
    effectUniforms
  );

  return {
    transformation,
    effectUniforms,
  };
};
