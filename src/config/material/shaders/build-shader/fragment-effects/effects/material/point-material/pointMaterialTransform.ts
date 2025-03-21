import { ShaderPropertyValueTypes } from "../../../../constants";
import { fragmentEffectToEffectData } from "../../../../helpers/fragmentEffectToEffectData";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import {
  PointMaterialFragmentEffectProps,
  PointTexture,
} from "../../../../types";
import { FRAG_COLOR_NAME } from "../../../fragmentEffects.consts";
import { matcapMaterial } from "../matcap/matcap";
import { phongMaterial } from "../phong-material/phong";
import { getOverlayPixelColor } from "./point-material-functions/getOverlayPixelColor";
import { getPointColor } from "./point-material-functions/getPointColor";
import { getPointTexture } from "./point-material-functions/getPointTextures";
import { getTexturePixelColor } from "./point-material-functions/getTexturePixelColor";
import { textureAsPoints } from "./point-material-functions/textureAsPoints";
import { EXTERNAL_POINT_COLOR_EFFECTS } from "./pointMaterial.consts";

const setUpTextureUniforms = (pointTextures: PointTexture[]) =>
  pointTextures.map(({ id }) => ({
    id,
    valueType: ShaderPropertyValueTypes.SAMPLER2D,
  }));

export const pointMaterialTransform = (
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { pointTextures, effectType } = pointEffectProps;
  const defaultEffectUniforms = {
    defaultUniforms: [],
    customUniforms: setUpTextureUniforms(pointTextures),
  };

  const {
    effectTransform,
    effectAttributes,
    effectVaryings,
    effectRequiredFunctions,
    effectUniforms: returnedEffectUniforms,
  } = getEffectData(pointEffectProps);

  const pointColor = EXTERNAL_POINT_COLOR_EFFECTS.includes(effectType)
    ? `${FRAG_COLOR_NAME}`
    : null;
  const transform = `
 float opacity = 1.0;
  ${effectTransform}
   if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
 

  ${getPointTexture(pointTextures, pointColor)}

  if(${FRAG_COLOR_NAME}.a < 0.5) discard;
  `;

  return {
    transform,

    effectAttributes,
    effectRequiredFunctions,
    effectVaryings,
    effectUniforms: mergeUniformConfigs([
      defaultEffectUniforms,
      returnedEffectUniforms,
    ]),
  };
};

const POINT_COLOR_EFFECT_FUNCTIONS = {
  PIXEL_COLOR: getTexturePixelColor,
  OVERLAY_COLOR: getOverlayPixelColor,
  MATCAP: matcapMaterial,
  TEXTURE: textureAsPoints,
  PHONG: phongMaterial,
};
const getEffectData = (pointEffectProps: PointMaterialFragmentEffectProps) => {
  const { effectProps, effectType } = pointEffectProps;
  const effectFunction = POINT_COLOR_EFFECT_FUNCTIONS[effectType];
  if (effectFunction) {
    return fragmentEffectToEffectData(effectFunction(effectProps));
  }
  return defaultPointMaterial(pointEffectProps);
};

const defaultPointMaterial = (
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { defaultColor } = pointEffectProps;
  const transformation = `${getPointColor(defaultColor)}`;
  return fragmentEffectToEffectData({
    transformation,
  });
};
