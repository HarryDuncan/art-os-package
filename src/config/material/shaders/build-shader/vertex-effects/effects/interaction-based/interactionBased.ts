import {
  ParameterConfig,
  TransformationConfig,
} from "../../../buildShader.types";
import { generateShaderTransformationOld } from "../../../helpers/generateTransform";
import { mergeShaderFunctions } from "../../../helpers/mergeShaderFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";

import { VertexEffectProps } from "../../vertexEffects.types";
import { getVertexEffect } from "../getVertexEffect";
import { affectedPositionTransformConfig } from "./interaction-transforms/affectedPosition";

export const interactionTransformConfig = {
  effectName: "interactionTransform",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [],
} as unknown as TransformationConfig;

// todo - effect varyings
export const interactionBased = (effectProps: VertexEffectProps) => {
  const { effectType, effectParameters, subEffects } = effectProps;
  const subEffectData = subEffects.flatMap((subEffect) => {
    const vertexEffectData = getVertexEffect(subEffect);
    if (vertexEffectData !== null) {
      return {
        transformation: vertexEffectData.transformation,
        requiredFunctions: vertexEffectData.requiredFunctions,
      };
    }
    return [];
  });

  const interactionAffectTransform = getInteractionEffectTransform(effectType);
  const binaryVaryings = getActiveAndInactiveInstantiation([]);
  const effectCode = [
    ...binaryVaryings.map(({ inactiveInstantiation }) => inactiveInstantiation),
    ...interactionAffectTransform.effectCode,
    ...subEffectData.map((subEffect) => subEffect.transformation),
    ...binaryVaryings.map(({ activeInstantiation }) => activeInstantiation),
    "};",
  ];
  const transformConfig = { ...interactionTransformConfig, effectCode };
  const transformation = generateShaderTransformationOld(
    transformConfig,
    effectParameters
  );

  // const mergedVaryingConfigs = mergeVaryingConfigs(
  //   subEffectData.map(({ varyingConfigs }) => varyingConfigs)
  // );
  const mergedRequiredFunction = mergeShaderFunctions(
    subEffectData.map(({ requiredFunctions }) => requiredFunctions)
  );
  // const mergedUniformConfig = mergeUniformConfigs(
  //   subEffectData.map(({ uniformConfigs }) => uniformConfigs)
  // );
  // const mergedAttributeConfig = mergeAttributeConfigs(
  //   subEffectData.map(({ attributeConfigs }) => attributeConfigs)
  // );
  return {
    transformation,
    requiredFunctions: mergedRequiredFunction,
  };
};

const INTERACTION_TRANSFORM_MAP = {
  AFFECTED_POSITION: affectedPositionTransformConfig,
};
const getInteractionEffectTransform = (effectType: string) => {
  const transformationConfig =
    INTERACTION_TRANSFORM_MAP[
      effectType as keyof typeof INTERACTION_TRANSFORM_MAP
    ];
  return transformationConfig;
};

const getActiveAndInactiveInstantiation = (
  effectParameters: ParameterConfig[]
) => {
  // const binaryParameters = effectParameters.filter(
  //   (parameter) =>
  //     parameter.isVarying &&
  //     parameter.varyingConfig?.varyingType === VARYING_TYPES.BINARY
  // );
  // const binaryVaryings = binaryParameters.flatMap((varying) => {
  //   const { inactiveValue, activeValue } = varying.varyingConfig ?? {};

  //     const inactiveValue =
  //       varying.inactiveValue !== undefined
  //         ? varying.inactiveValue
  //         : varying.value;

  //     const inactiveInstantiation = `${varying.id} = ${parseRawValueToShader(
  //       varying.valueType,
  //       inactiveValue
  //     )};`;
  //     const activeValue =
  //       varying.activeValue !== undefined ? varying.activeValue : varying.value;
  //     const activeInstantiation = `${varying.id} = ${parseRawValueToShader(
  //       varying.valueType,
  //       activeValue
  //     )};`;
  //     return { inactiveInstantiation, activeInstantiation };
  //   }
  //   return [];
  // });
  return [];
};
