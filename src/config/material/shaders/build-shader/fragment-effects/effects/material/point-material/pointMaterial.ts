import { AttributeConfig, UniformConfig } from "../../../../buildShader.types";
import { reduceFunctions } from "../../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeVaryingConfigs } from "../../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { FragmentEffectProps } from "../../../fragmentShader.types";
import {
  POINT_MATERIAL_ATTRIBUTES,
  POINT_MATERIAL_FUNCTIONS,
  POINT_MATERIAL_UNIFORMS,
  POINT_MATERIAL_VARYINGS,
} from "./pointMaterial.consts";
import { pointMaterialTransform } from "./pointMaterialTransform";

export const pointMaterial = (effectProps: FragmentEffectProps) => {
  const { effectType, effectParameters, effectUniforms } = effectProps;

  const transformation = pointMaterialTransform(
    effectType,
    effectParameters,
    effectUniforms
  );

  const mergedVaryings = mergeVaryingConfigs([POINT_MATERIAL_VARYINGS]);
  const mergedAttributes = mergeAttributeConfigs([
    POINT_MATERIAL_ATTRIBUTES as AttributeConfig[],
  ]);
  const requiredFunctions = reduceFunctions([POINT_MATERIAL_FUNCTIONS]);
  return {
    requiredFunctions,
    transformation,
    uniformConfig: POINT_MATERIAL_UNIFORMS as UniformConfig,
    varyingConfig: mergedVaryings,
    attributeConfig: mergedAttributes,
  };
};
