import {
  TransformationConfig,
  UniformConfig,
  UniformValueConfig,
  VaryingConfig,
  VertexEffectConfig,
} from "../../../../../../..";
import { generateShaderTransformation } from "../../../helpers/generateTransform";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { parseRawValueToShader } from "../../../helpers/safeParseValue";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VARYING_TYPES } from "../../../shader-properties/varyings/varyings.consts";
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

export const interactionBasedTransform = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  effectVaryings: VaryingConfig[],
  subEffects: VertexEffectConfig[],
  unfilteredUniforms: UniformConfig,
  unfilteredVaryings: VaryingConfig[]
) => {
  const subEffectData = subEffects.flatMap((subEffect) => {
    const vertexEffectData = getVertexEffect(
      subEffect,
      unfilteredUniforms,
      unfilteredVaryings
    );
    if (vertexEffectData !== null) {
      return {
        transformation: vertexEffectData.transformation,
        requiredFunctions: vertexEffectData.requiredFunctions,
        uniformConfig: vertexEffectData.uniformConfig,
        attributeConfig: vertexEffectData.attributeConfig,
        varyingConfig: vertexEffectData.varyingConfig,
      };
    }
    return [];
  });

  const interactionAffectTransform = getInteractionEffectTransform(effectType);
  const binaryVaryings = getActiveAndInactiveInstantiation(effectVaryings);
  const effectCode = [
    ...binaryVaryings.map(({ inactiveInstantiation }) => inactiveInstantiation),
    ...interactionAffectTransform.effectCode,
    ...subEffectData.map((subEffect) => subEffect.transformation),
    ...binaryVaryings.map(({ activeInstantiation }) => activeInstantiation),
    "};",
  ];
  const transformConfig = { ...interactionTransformConfig, effectCode };
  const transformation = generateShaderTransformation(
    transformConfig,
    effectUniforms
  );

  const mergedVaryingConfigs = mergeVaryingConfigs(
    subEffectData.map(({ varyingConfig }) => varyingConfig)
  );
  const mergedRequiredFunction = reduceFunctions(
    subEffectData.map(({ requiredFunctions }) => requiredFunctions)
  );

  return {
    transformation,
    requiredFunctions: mergedRequiredFunction,
    varyingConfig: mergedVaryingConfigs,
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

const getActiveAndInactiveInstantiation = (effectVaryings: VaryingConfig[]) => {
  const binaryVaryings = effectVaryings.flatMap((varying) => {
    if (varying.varyingType === VARYING_TYPES.BINARY) {
      const inactiveValue =
        varying.inactiveValue !== undefined
          ? varying.inactiveValue
          : varying.value;

      const inactiveInstantiation = `${varying.id} = ${parseRawValueToShader(
        varying.valueType,
        inactiveValue
      )};`;
      const activeValue =
        varying.activeValue !== undefined ? varying.activeValue : varying.value;
      const activeInstantiation = `${varying.id} = ${parseRawValueToShader(
        varying.valueType,
        activeValue
      )};`;
      return { inactiveInstantiation, activeInstantiation };
    }
    return [];
  });
  return binaryVaryings;
};
