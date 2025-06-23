import { SHADER_PROPERTY_VALUE_TYPES } from "../shader.consts";
import { VARYING_TYPES } from "../../shader-properties/varyings/varyings.consts";

export const NORMAL_VARYING = {
  id: "vNormal",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  configLocked: true,
  isAssetMapped: false,
  isAttribute: false,
  isUniform: false,
  isVarying: true,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
};

export const POSITION_VARYING = {
  id: "vPosition",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
  value: null,
  configLocked: true,
  isAssetMapped: false,
  isAttribute: false,
  isUniform: false,
  isVarying: true,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
};

export const VIEW_DIRECTION_VARYING = {
  id: "vViewDirection",
  valueType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  value: null,
  configLocked: true,
  isAssetMapped: false,
  isAttribute: false,
  isUniform: false,
  isVarying: true,
  varyingConfig: {
    varyingType: VARYING_TYPES.DEFAULT,
  },
};
