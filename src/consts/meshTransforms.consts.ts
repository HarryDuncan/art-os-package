import { ShaderPropertyValueTypes } from "../config/material/shaders/build-shader/constants";

export const DEFAULT_MORPH_ATTRIBUTE_CONFIG = [
  {
    id: "pointIndex",
    valueType: ShaderPropertyValueTypes.FLOAT,
  },
  {
    id: "randomAngle",
    valueType: ShaderPropertyValueTypes.FLOAT,
  },
  {
    id: "randomBool",
    valueType: ShaderPropertyValueTypes.FLOAT,
  },
  {
    id: "randomBool2",
    valueType: ShaderPropertyValueTypes.FLOAT,
  },
];
