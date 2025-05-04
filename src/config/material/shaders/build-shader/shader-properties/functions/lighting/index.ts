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

export const pointLightInfoFunction = {
  id: "getPointLightInfo",
  functionDefinition: pointLightInfo,
};

export const dfgApproxFunction = {
  id: "dfgApprox",
  functionDefinition: dfgApprox,
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
};

export const fSchlickVectorFunction = {
  id: "fSchlickVector",
  functionDefinition: fSchlickVector,
};

export const fSchlickFloatFunction = {
  id: "fSchlickFloat",
  functionDefinition: fSchlickFloat,
};

export const vGGXSmithCorrelatedFunction = {
  id: "vGGXSmithCorrelated",
  functionDefinition: vGGXSmithCorrelated,
};

export const brdfGgxFunction = {
  id: "brdfGgx",
  functionDefinition: brdfGgx,
};

export const dGGXFunction = {
  id: "dGGX",
  functionDefinition: dGGX,
};

export const diffuseFactorFunction = {
  id: "diffuseFactor",
  functionDefinition: diffuseFactor,
};
