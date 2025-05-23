import {
  pointLightInfo,
  dfgApprox,
  computeMultiScattering,
  indirectSpecularPhysical,
  redirectPhysicalLight,
  brdfLambert,
  getDistanceAttenuation,
  inverseTransformDirection,
  shGetIrradianceAt,
  getLightProbeIrradiance,
  linearToneMapping,
  indirectDiffusePhysical,
  linearTosRGB,
  fSchlickVector,
  fSchlickFloat,
  vGGXSmithCorrelated,
  brdfGgx,
  dGGX,
} from "./light";

import { diffuseFactor } from "./diffuseFactor";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const pointLightInfoFunction = {
  id: "getPointLightInfo",
  functionDefinition: pointLightInfo,
};

export const dfgApproxFunction = {
  id: "dfgApprox",
  functionDefinition: dfgApprox,
  functionType: FUNCTION_TYPES.STATIC,
};

export const computeMultiScatteringFunction = {
  id: "computeMultiScattering",
  functionDefinition: computeMultiScattering,
};

export const indirectSpecularPhysicalFunction = {
  id: "indirectSpecularPhysical",
  functionDefinition: indirectSpecularPhysical,
};

export const redirectPhysicalLightFunction = {
  id: "redirectPhysicalLight",
  functionDefinition: redirectPhysicalLight,
};

export const brdfLambertFunction = {
  id: "brdfLambert",
  functionDefinition: brdfLambert,
};

export const getDistanceAttenuationFunction = {
  id: "getDistanceAttenuation",
  functionDefinition: getDistanceAttenuation,
};

export const inverseTransformDirectionFunction = {
  id: "inverseTransformDirection",
  functionDefinition: inverseTransformDirection,
};

export const shGetIrradianceAtFunction = {
  id: "shGetIrradianceAt",
  functionDefinition: shGetIrradianceAt,
};

export const getLightProbeIrradianceFunction = {
  id: "getLightProbeIrradiance",
  functionDefinition: getLightProbeIrradiance,
};

export const linearToneMappingFunction = {
  id: "linearToneMapping",
  functionDefinition: linearToneMapping,
};

export const indirectDiffusePhysicalFunction = {
  id: "indirectDiffusePhysical",
  functionDefinition: indirectDiffusePhysical,
};

export const linearTosRGBFunction = {
  id: "linearTosRGB",
  functionDefinition: linearTosRGB,
  functionType: FUNCTION_TYPES.STATIC,
};

export const fSchlickVectorFunction = {
  id: "fSchlickVector",
  functionDefinition: fSchlickVector,
  functionType: FUNCTION_TYPES.STATIC,
};

export const fSchlickFloatFunction = {
  id: "fSchlickFloat",
  functionDefinition: fSchlickFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const vGGXSmithCorrelatedFunction = {
  id: "vGGXSmithCorrelated",
  functionDefinition: vGGXSmithCorrelated,
};

export const brdfGgxFunction = {
  id: "brdfGgx",
  functionDefinition: brdfGgx,
  functionType: FUNCTION_TYPES.STATIC,
};

export const dGGXFunction = {
  id: "dGGX",
  functionDefinition: dGGX,
  functionType: FUNCTION_TYPES.STATIC,
};

export const diffuseFactorFunction = {
  id: "diffuseFactor",
  functionDefinition: diffuseFactor,
  functionType: FUNCTION_TYPES.STATIC,
};
