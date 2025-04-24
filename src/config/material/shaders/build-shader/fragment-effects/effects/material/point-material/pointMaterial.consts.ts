import { VaryingConfig } from "../../../../../../../../types/materials/shaders/buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../consts/materials/shader.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";

export const DEFAULT_FRAG_POINT_PROPS = {
  pointDisplayPercentage: 0.5,
  pointTextures: [
    { id: "uTexture1", pointColor: "#ff1205" },
    { id: "uTexture2", pointColor: "#ff1005" },
  ],
  pointColor: "#ff1205",
};

export const POINT_MATERIAL_VARYINGS = [
  {
    id: "vPointDisplay",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointDisplay",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
  {
    id: "vPointType",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "pointType",
    valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
  },
] as VaryingConfig[];

export const POINT_MATERIAL_FUNCTIONS = [];

export const POINT_MATERIAL_ATTRIBUTES = [
  { id: "pointType", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
  { id: "pointDisplay", valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT },
];

export const POINT_MATERIAL_UNIFORMS = {
  defaultUniforms: ["uOpacity"],
  customUniforms: [],
};

export const POINT_COLOR_EFFECTS = {
  COLOR: "COLOR",
  PIXEL_COLOR: "PIXEL_COLOR",
  OVERLAY_COLOR: "OVERLAY_COLOR",
  MATCAP: "MATCAP",
  TEXTURE: "TEXTURE",
  PHONG: "PHONG",
};

export const EXTERNAL_POINT_COLOR_EFFECTS = [
  POINT_COLOR_EFFECTS.MATCAP,
  POINT_COLOR_EFFECTS.OVERLAY_COLOR,
  POINT_COLOR_EFFECTS.PHONG,
  POINT_COLOR_EFFECTS.PIXEL_COLOR,
  POINT_COLOR_EFFECTS.TEXTURE,
];
