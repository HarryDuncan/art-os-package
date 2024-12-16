import { POINT_PARENTS } from "../../../../../constants/buildShader.consts";
import {
  AttributeConfig,
  ImageToPointsEffectProps,
  ShaderFunction,
  VaryingConfig,
} from "../../../../../types";
import { formatVertexParameters } from "../../../../../helpers/formatVertexParameters";
import { generateUniquePointName } from "../../../../../helpers/generateUniquePointName";
import { reduceFunctions } from "../../../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../../vertexEffects.consts";
import {
  DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS,
  IMAGE_TO_POINTS_ATTRIBUTE_CONFIG,
  IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  IMAGE_TO_POINTS_UNIFORM_CONFIG,
  IMAGE_TO_POINTS_VARYING_CONFIG,
} from "./imageToPoints.consts";
import { imageToPointsTransform } from "./imageToPointsTransform";

export const imageToPoints = (
  previousPointName: string,
  effectProps: Partial<ImageToPointsEffectProps>
) => {
  const imageToPointsEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS as ImageToPointsEffectProps
  ) as ImageToPointsEffectProps;

  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.IMAGE_VERTEX_POINT,
    POINT_PARENTS.IMAGE_EFFECT
  );

  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectFunctions,
    effectAttributes,
    vertexPointInstantiation,
  } = imageToPointsTransform(
    pointName,
    previousPointName,
    imageToPointsEffectProps
  );

  const uniformConfig = IMAGE_TO_POINTS_UNIFORM_CONFIG;
  const varyingConfig = IMAGE_TO_POINTS_VARYING_CONFIG;
  const requiredFunctions: ShaderFunction[] =
    IMAGE_TO_POINTS_REQUIRED_FUNCTIONS;
  const attributeConfig = IMAGE_TO_POINTS_ATTRIBUTE_CONFIG as AttributeConfig[];

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    uniformConfig,
  ]);
  const mergedVaryingConfigs = mergeVaryingConfigs([
    effectVaryings as VaryingConfig[],
    varyingConfig,
  ]);
  const mergedRequiredFunction = reduceFunctions([
    effectFunctions,
    requiredFunctions,
  ]);
  const mergedAttributeConfigs = mergeAttributeConfigs([
    attributeConfig,
    effectAttributes,
  ]);
  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    attributeConfig: mergedAttributeConfigs,
    transformation,
    varyingConfig: mergedVaryingConfigs,
    pointName,
    vertexPointInstantiation,
  };
};
