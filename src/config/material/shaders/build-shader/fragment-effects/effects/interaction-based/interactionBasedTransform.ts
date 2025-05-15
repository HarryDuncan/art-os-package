import {
  TransformationConfig,
  UniformValueConfig,
} from "../../../buildShader.types";
import { FragmentEffectConfig } from "../../../buildShader.types";
import { UniformConfig } from "../../../buildShader.types";
import { FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
import { generateShaderTransformation } from "../../../helpers/generateTransform";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { getFragmentEffects } from "../getFragmentEffects";
import { affectedPositionTransformConfig } from "./affectedPosition";

export const interactionTransformConfig = {
  effectName: "interactionTransform",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [],
} as unknown as TransformationConfig;

export const interactionBasedTransform = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  unfilteredUniforms: UniformConfig,
  subEffects: FragmentEffectConfig[]
) => {
  const subEffectData = subEffects.map((subEffect) => {
    const { transformation, requiredFunctions, uniformConfig } =
      getFragmentEffects(subEffect, unfilteredUniforms);
    return {
      transformation,
      requiredFunctions,
      uniformConfig,
    };
  });

  const interactionAffectTransform = getInteractionEffectTransform(effectType);
  const effectCode = [
    ...interactionAffectTransform.effectCode,
    ...subEffectData.map((subEffect) => subEffect.transformation),
    "};",
  ];

  const transformConfig = { ...interactionTransformConfig, effectCode };
  const transformation = generateShaderTransformation(
    transformConfig,
    effectUniforms
  );

  const mergedRequiredFunction = reduceFunctions(
    subEffectData.map(({ requiredFunctions }) => requiredFunctions)
  );

  return {
    transformation,
    requiredFunctions: mergedRequiredFunction,
  };
};

const INTERACTION_TRANSFORM_MAP: Record<string, TransformationConfig> = {
  [FRAGMENT_EFFECT.AFFECTED_POSITION]: affectedPositionTransformConfig,
};

const getInteractionEffectTransform = (effectType: string) => {
  const transformationConfig =
    INTERACTION_TRANSFORM_MAP[
      effectType as keyof typeof INTERACTION_TRANSFORM_MAP
    ];
  return transformationConfig;
};
