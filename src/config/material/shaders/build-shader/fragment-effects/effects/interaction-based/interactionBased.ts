import { TransformationConfig } from "../../../buildShader.types";
import { FRAGMENT_EFFECTS } from "../../fragmentEffects.consts";
import { generateShaderTransformationOld } from "../../../helpers/generateTransform";
import { mergeShaderFunctions } from "../../../helpers/mergeShaderFunctions";
import { getFragmentEffects } from "../getFragmentEffects";
import { affectedPositionTransformConfig } from "./affectedPosition";
import { FragmentEffectProps } from "../../fragmentShader.types";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";

export const interactionTransformConfig = {
  effectName: "interactionTransform",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [],
} as unknown as TransformationConfig;

export const interactionBased = (effectProps: FragmentEffectProps) => {
  const { effectType, subEffects, effectParameters } = effectProps;
  const subEffectData = subEffects.flatMap((subEffect) => {
    const fragmentEffectData = getFragmentEffects(subEffect);
    if (!fragmentEffectData) {
      return [];
    }
    return fragmentEffectData;
  });

  const interactionAffectTransform = getInteractionEffectTransform(effectType);
  const effectCode = [
    ...interactionAffectTransform.effectCode,
    ...subEffectData.map((subEffect) => subEffect.transformation),
    "};",
  ];

  const transformConfig = { ...interactionTransformConfig, effectCode };
  const transformation = generateShaderTransformationOld(
    transformConfig,
    effectParameters
  );

  const mergedRequiredFunction = mergeShaderFunctions(
    subEffectData.map(({ requiredFunctions }) => requiredFunctions)
  );

  const mergedUniforms = mergeUniformConfigs(
    subEffectData.map(({ uniformConfigs }) => uniformConfigs)
  );
  const mergedVaryings = mergeVaryingConfigs(
    subEffectData.map(({ varyingConfigs }) => varyingConfigs)
  );
  const mergedAttributes = mergeAttributeConfigs(
    subEffectData.map(({ attributeConfigs }) => attributeConfigs)
  );

  return {
    transformation,
    requiredFunctions: mergedRequiredFunction,
    uniformConfigs: mergedUniforms,
    varyingConfigs: mergedVaryings,
    attributeConfigs: mergedAttributes,
  };
};

const INTERACTION_TRANSFORM_MAP: Record<string, TransformationConfig> = {
  [FRAGMENT_EFFECTS.AFFECTED_POSITION]: affectedPositionTransformConfig,
};

const getInteractionEffectTransform = (effectType: string) => {
  const transformationConfig =
    INTERACTION_TRANSFORM_MAP[
      effectType as keyof typeof INTERACTION_TRANSFORM_MAP
    ];
  return transformationConfig;
};
