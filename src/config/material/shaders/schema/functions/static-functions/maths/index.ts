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
  key: "mod289",
  functionName: "mod289Float",
  functionDefinition: mod289Float,
  functionType: FUNCTION_TYPES.STATIC,
};

export const mod289Vec3Function = {
  key: "mod289",
  functionName: "mod289Vec3",
  functionDefinition: mod289Vec3,
  functionType: FUNCTION_TYPES.STATIC,
};

export const mod289Vec4Function = {
  key: "mod289",
  functionName: "mod289Vec4",
  functionDefinition: mod289Vec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const pow2Function = {
  key: "pow2",
  functionName: "pow2",
  functionDefinition: pow2,
  functionType: FUNCTION_TYPES.STATIC,
};

export const permuteFloatFunction = {
  key: "permute",
  functionName: "permuteFloat",
  functionDefinition: permuteFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const permuteVec4Function = {
  key: "permute",
  functionName: "permuteVec4",
  functionDefinition: permuteVec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const taylorInvSqrtFloatFunction = {
  key: "taylorInvSqrt",
  functionName: "taylorInvSqrtFloat",
  functionDefinition: taylorInvSqrtFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const taylorInvSqrtVec4Function = {
  key: "taylorInvSqrt",
  functionName: "taylorInvSqrtVec4",
  functionDefinition: taylorInvSqrtVec4,
  functionType: FUNCTION_TYPES.STATIC,
};

export const calculateNormalFunction = {
  key: "calculateNormal",
  functionName: "calculateNormal",
  functionDefinition: calculateNormal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const hash33Function = {
  key: "hash33",
  functionName: "hash33",
  functionDefinition: hash33,
  functionType: FUNCTION_TYPES.STATIC,
};

export const interpolateFunction = {
  key: "interpolate",
  functionName: "interpolate",
  functionDefinition: interpolate,
  functionType: FUNCTION_TYPES.STATIC,
};

export const normSinFunction = {
  key: "normSin",
  functionName: "normSin",
  functionDefinition: normSin,
  functionType: FUNCTION_TYPES.STATIC,
};

export const orthogonalFunction = {
  key: "orthogonal",
  functionName: "orthogonal",
  functionDefinition: orthogonal,
  functionType: FUNCTION_TYPES.STATIC,
};

export const scaleVector3Function = {
  key: "scaleVector3",
  functionName: "scaleVector3",
  functionDefinition: scaleVector3,
  functionType: FUNCTION_TYPES.STATIC,
};
