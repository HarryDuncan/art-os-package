import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import { MorphEffectProps } from "../../../types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";
import { buildMorphTransforms } from "./buildMorphTransforms";
import {
  DEFAULT_MORPH_EFFECT_PROPS,
  DEFAULT_UNIFORM_CONFIG,
} from "./morphVertex.consts";
import { setUpMorphObjects } from "./setUpMorphObjects";

const getAttributeConfig = (morphCount: number) =>
  new Array(morphCount).fill("").flatMap((_value, index) => [
    {
      id: `morphPosition${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: `morphNormal${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
  ]);
export const morphVertex = (
  previousPointName: string,
  effectProps: Partial<MorphEffectProps> | undefined = {}
) => {
  const formattedProps = formatVertexParameters(
    effectProps,
    DEFAULT_MORPH_EFFECT_PROPS
  ) as MorphEffectProps;

  const { morphCount, preTransformConfigs } = formattedProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.MORPHED_POINT;

  const attributeConfig = getAttributeConfig(morphCount);
  const { requiredFunctions, morphObjects, transforms } = setUpMorphObjects(
    morphCount,
    preTransformConfigs
  );
  const transformation = `
    vec3 currentPosition = ${previousPointName}.xyz;
    vec3 currentNormal = normal;
    ${transforms.map((value) => `${value} \n `).join(" \n ")}
    vec3 effect_direction = ${morphObjects[0].pointName} - currentPosition;
    vec3 normal_effect_direction = ${morphObjects[0].normalName} - normal;
    ${buildMorphTransforms(morphObjects, previousPointName)}
    vec3 ${pointName} = currentPosition + (effect_direction * (uProgress));
    `;
  return {
    requiredFunctions,
    uniformConfig: DEFAULT_UNIFORM_CONFIG,
    transformation,
    attributeConfig,
    varyingConfig: [],
    pointName,
  };
};
