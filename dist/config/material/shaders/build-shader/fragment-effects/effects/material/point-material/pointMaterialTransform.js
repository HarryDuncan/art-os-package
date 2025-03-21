"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointMaterialTransform = void 0;
const constants_1 = require("../../../../constants");
const fragmentEffectToEffectData_1 = require("../../../../helpers/fragmentEffectToEffectData");
const mergeUniformConfigs_1 = require("../../../../shader-properties/uniforms/helpers/mergeUniformConfigs");
const fragmentEffects_consts_1 = require("../../../fragmentEffects.consts");
const matcap_1 = require("../matcap/matcap");
const phong_1 = require("../phong-material/phong");
const getOverlayPixelColor_1 = require("./point-material-functions/getOverlayPixelColor");
const getPointColor_1 = require("./point-material-functions/getPointColor");
const getPointTextures_1 = require("./point-material-functions/getPointTextures");
const getTexturePixelColor_1 = require("./point-material-functions/getTexturePixelColor");
const textureAsPoints_1 = require("./point-material-functions/textureAsPoints");
const pointMaterial_consts_1 = require("./pointMaterial.consts");
const setUpTextureUniforms = (pointTextures) => pointTextures.map(({ id }) => ({
    id,
    valueType: constants_1.ShaderPropertyValueTypes.SAMPLER2D,
}));
const pointMaterialTransform = (pointEffectProps) => {
    const { pointTextures, effectType } = pointEffectProps;
    const defaultEffectUniforms = {
        defaultUniforms: [],
        customUniforms: setUpTextureUniforms(pointTextures),
    };
    const { effectTransform, effectAttributes, effectVaryings, effectRequiredFunctions, effectUniforms: returnedEffectUniforms, } = getEffectData(pointEffectProps);
    const pointColor = pointMaterial_consts_1.EXTERNAL_POINT_COLOR_EFFECTS.includes(effectType)
        ? `${fragmentEffects_consts_1.FRAG_COLOR_NAME}`
        : null;
    const transform = `
 float opacity = 1.0;
  ${effectTransform}
   if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
 

  ${(0, getPointTextures_1.getPointTexture)(pointTextures, pointColor)}

  if(${fragmentEffects_consts_1.FRAG_COLOR_NAME}.a < 0.5) discard;
  `;
    return {
        transform,
        effectAttributes,
        effectRequiredFunctions,
        effectVaryings,
        effectUniforms: (0, mergeUniformConfigs_1.mergeUniformConfigs)([
            defaultEffectUniforms,
            returnedEffectUniforms,
        ]),
    };
};
exports.pointMaterialTransform = pointMaterialTransform;
const POINT_COLOR_EFFECT_FUNCTIONS = {
    PIXEL_COLOR: getTexturePixelColor_1.getTexturePixelColor,
    OVERLAY_COLOR: getOverlayPixelColor_1.getOverlayPixelColor,
    MATCAP: matcap_1.matcapMaterial,
    TEXTURE: textureAsPoints_1.textureAsPoints,
    PHONG: phong_1.phongMaterial,
};
const getEffectData = (pointEffectProps) => {
    const { effectProps, effectType } = pointEffectProps;
    const effectFunction = POINT_COLOR_EFFECT_FUNCTIONS[effectType];
    if (effectFunction) {
        return (0, fragmentEffectToEffectData_1.fragmentEffectToEffectData)(effectFunction(effectProps));
    }
    return defaultPointMaterial(pointEffectProps);
};
const defaultPointMaterial = (pointEffectProps) => {
    const { defaultColor } = pointEffectProps;
    const transformation = `${(0, getPointColor_1.getPointColor)(defaultColor)}`;
    return (0, fragmentEffectToEffectData_1.fragmentEffectToEffectData)({
        transformation,
    });
};
