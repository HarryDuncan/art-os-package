import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import { reduceFunctions } from "../../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import {
  PointMaterialFragmentEffectProps,
  UniformConfig,
} from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import {
  DEFAULT_POINT_MATERIAL_PROPS,
  POINT_MATERIAL_ATTRIBUTES,
  POINT_MATERIAL_FUNCTIONS,
  POINT_MATERIAL_UNIFORMS,
  POINT_MATERIAL_VARYINGS,
} from "./pointMaterial.consts";
import { pointMaterialTransform } from "./pointMaterialTransform";

export const pointMaterial = (
  previousFragName: string,
  effectProps: Partial<PointMaterialFragmentEffectProps> = {}
) => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.POINT_MATERIAL,
    effectProps.pointParent
  );

  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_POINT_MATERIAL_PROPS
  ) as PointMaterialFragmentEffectProps;

  const {
    effectUniforms,
    transform,
    effectAttributes,
    effectVaryings,
    effectRequiredFunctions,
  } = pointMaterialTransform(fragName, previousFragName, formattedProps);

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    POINT_MATERIAL_UNIFORMS as UniformConfig,
  ]);

  const mergedVaryings = mergeVaryingConfigs([
    POINT_MATERIAL_VARYINGS,
    effectVaryings,
  ]);
  const mergedAttributes = mergeAttributeConfigs([
    POINT_MATERIAL_ATTRIBUTES,
    effectAttributes,
  ]);
  const requiredFunctions = reduceFunctions([
    POINT_MATERIAL_FUNCTIONS,
    effectRequiredFunctions,
  ]);
  return {
    requiredFunctions,
    uniformConfig: mergedUniformConfigs,
    transformation: transform,
    varyingConfig: mergedVaryings,
    attributeConfig: mergedAttributes,
    fragName,
  };
};
