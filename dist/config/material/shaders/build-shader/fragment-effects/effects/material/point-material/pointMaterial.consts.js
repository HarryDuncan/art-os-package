"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTERNAL_POINT_COLOR_EFFECTS = exports.POINT_MATERIAL_UNIFORMS = exports.POINT_MATERIAL_ATTRIBUTES = exports.POINT_MATERIAL_FUNCTIONS = exports.POINT_MATERIAL_VARYINGS = exports.DEFAULT_POINT_MATERIAL_PROPS = void 0;
const constants_1 = require("../../../../constants");
const varyings_consts_1 = require("../../../../shader-properties/varyings/varyings.consts");
exports.DEFAULT_POINT_MATERIAL_PROPS = {
    pointDisplayPercentage: 0.5,
    pointTextures: [
        { id: "uTexture1", pointColor: "#ff1205" },
        { id: "uTexture2", pointColor: "#ff1005" },
    ],
    pointColor: "#ff1205",
};
exports.POINT_MATERIAL_VARYINGS = [
    {
        id: "vPointDisplay",
        varyingType: varyings_consts_1.VARYING_TYPES.ATTRIBUTE,
        attributeKey: "pointDisplay",
        valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
    },
    {
        id: "vPointType",
        varyingType: varyings_consts_1.VARYING_TYPES.ATTRIBUTE,
        attributeKey: "pointType",
        valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
    },
];
exports.POINT_MATERIAL_FUNCTIONS = [];
exports.POINT_MATERIAL_ATTRIBUTES = [
    { id: "pointType", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
    { id: "pointDisplay", valueType: constants_1.ShaderPropertyValueTypes.FLOAT },
];
exports.POINT_MATERIAL_UNIFORMS = {
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
exports.EXTERNAL_POINT_COLOR_EFFECTS = [
    POINT_COLOR_EFFECTS.MATCAP,
    POINT_COLOR_EFFECTS.OVERLAY_COLOR,
    POINT_COLOR_EFFECTS.PHONG,
    POINT_COLOR_EFFECTS.PIXEL_COLOR,
    POINT_COLOR_EFFECTS.TEXTURE,
];
