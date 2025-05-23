import {
  mod289Float,
  mod289Vec3,
  mod289Vec4,
  pow2,
  permuteFloat,
  permuteVec4,
  taylorInvSqrtFloat,
  taylorInvSqrtVec4,
  calculateNormal,
  hash33,
  interpolate,
  normSin,
  orthogonal,
} from "./maths";

import { scaleVector3 } from "./vectorCalculations";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const mod289FloatFunction = {
  id: "mod289",
  functionDefinition: mod289Float,
};

export const mod289Vec3Function = {
  id: "mod289",
  functionDefinition: mod289Vec3,
  functionType: FUNCTION_TYPES.STATIC,
};

export const mod289Vec4Function = {
  id: "mod289",
  functionDefinition: mod289Vec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const pow2Function = {
  id: "pow2",
  functionDefinition: pow2,
  functionType: FUNCTION_TYPES.STATIC,
};

export const permuteFloatFunction = {
  id: "permute",
  functionDefinition: permuteFloat,
};

export const permuteVec4Function = {
  id: "permute",
  functionDefinition: permuteVec4,
};

export const taylorInvSqrtFloatFunction = {
  id: "taylorInvSqrt",
  functionDefinition: taylorInvSqrtFloat,
};

export const taylorInvSqrtVec4Function = {
  id: "taylorInvSqrt",
  functionDefinition: taylorInvSqrtVec4,
};

export const calculateNormalFunction = {
  id: "calculateNormal",
  functionDefinition: calculateNormal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const hash33Function = {
  id: "hash33",
  functionDefinition: hash33,
  functionType: FUNCTION_TYPES.STATIC,
};

export const interpolateFunction = {
  id: "interpolate",
  functionDefinition: interpolate,
};

export const normSinFunction = {
  id: "normSin",
  functionDefinition: normSin,
  functionType: FUNCTION_TYPES.STATIC,
};

export const orthogonalFunction = {
  id: "orthogonal",
  functionDefinition: orthogonal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const scaleVector3Function = {
  id: "scaleVector3",
  functionDefinition: scaleVector3,
  functionType: FUNCTION_TYPES.STATIC,
};
