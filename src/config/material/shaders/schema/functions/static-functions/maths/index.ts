import { FUNCTION_TYPES } from "../../../../generator/consts";
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

export const mod289FloatFunction = {
  id: "mod289",
  functionName: "mod289Float",
  functionDefinition: mod289Float,
  functionType: FUNCTION_TYPES.STATIC,
};

export const mod289Vec3Function = {
  id: "mod289",
  functionName: "mod289Vec3",
  functionDefinition: mod289Vec3,
  functionType: FUNCTION_TYPES.STATIC,
};

export const mod289Vec4Function = {
  id: "mod289",
  functionName: "mod289Vec4",
  functionDefinition: mod289Vec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const pow2Function = {
  id: "pow2",
  functionName: "pow2",
  functionDefinition: pow2,
  functionType: FUNCTION_TYPES.STATIC,
};

export const permuteFloatFunction = {
  id: "permute",
  functionName: "permuteFloat",
  functionDefinition: permuteFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const permuteVec4Function = {
  id: "permute",
  functionName: "permuteVec4",
  functionDefinition: permuteVec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const taylorInvSqrtFloatFunction = {
  id: "taylorInvSqrt",
  functionName: "taylorInvSqrtFloat",
  functionDefinition: taylorInvSqrtFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const taylorInvSqrtVec4Function = {
  id: "taylorInvSqrt",
  functionName: "taylorInvSqrtVec4",
  functionDefinition: taylorInvSqrtVec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const calculateNormalFunction = {
  id: "calculateNormal",
  functionName: "calculateNormal",
  functionDefinition: calculateNormal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const hash33Function = {
  id: "hash33",
  functionName: "hash33",
  functionDefinition: hash33,
  functionType: FUNCTION_TYPES.STATIC,
};

export const interpolateFunction = {
  id: "interpolate",
  functionName: "interpolate",
  functionDefinition: interpolate,
  functionType: FUNCTION_TYPES.STATIC,
};

export const normSinFunction = {
  id: "normSin",
  functionName: "normSin",
  functionDefinition: normSin,
  functionType: FUNCTION_TYPES.STATIC,
};

export const orthogonalFunction = {
  id: "orthogonal",
  functionName: "orthogonal",
  functionDefinition: orthogonal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const scaleVector3Function = {
  id: "scaleVector3",
  functionName: "scaleVector3",
  functionDefinition: scaleVector3,
  functionType: FUNCTION_TYPES.STATIC,
};
