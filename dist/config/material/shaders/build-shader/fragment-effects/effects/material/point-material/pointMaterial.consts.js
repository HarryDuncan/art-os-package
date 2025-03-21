import { ShaderPropertyValueTypes } from "../../../../constants";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
export const DEFAULT_POINT_MATERIAL_PROPS = {
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
        valueType: ShaderPropertyValueTypes.FLOAT,
    },
    {
        id: "vPointType",
        varyingType: VARYING_TYPES.ATTRIBUTE,
        attributeKey: "pointType",
        valueType: ShaderPropertyValueTypes.FLOAT,
    },
];
export const POINT_MATERIAL_FUNCTIONS = [];
export const POINT_MATERIAL_ATTRIBUTES = [
    { id: "pointType", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "pointDisplay", valueType: ShaderPropertyValueTypes.FLOAT },
];
export const POINT_MATERIAL_UNIFORMS = {
    defaultUniforms: ["uOpacity"],
    customUniforms: [],
};
const POINT_COLOR_EFFECTS = {
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
